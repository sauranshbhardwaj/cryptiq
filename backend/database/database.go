package database

import (
	"context"
	"fmt"
	pgxdecimal "github.com/jackc/pgx-shopspring-decimal"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

var Pool *pgxpool.Pool

func Init() {
	var err error
	config, err := pgxpool.ParseConfig(os.Getenv("POSTGRES_URL"))
	if err != nil {
		log.Fatalf("Unable to parse DATABASE URL: %v", err)
	}

	config.AfterConnect = func(ctx context.Context, conn *pgx.Conn) error {
		pgxdecimal.Register(conn.TypeMap())
		return nil
	}

	Pool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("Unable to create connection pool: %v", err)
	}

	if err := runSQLFiles(Pool, "./database/migrations"); err != nil {
		log.Fatalf("Failed to run SQL files: %v", err)
	}

	UpdateCoinPricesPeriodically(Pool)
	UpdateSPYXAUPricesPeriodically(Pool)
}

func runSQLFiles(conn *pgxpool.Pool, folder string) error {
	files, err := ioutil.ReadDir(folder)
	if err != nil {
		return fmt.Errorf("failed to read folder: %v", err)
	}

	var sqlFiles []string
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".sql") {
			sqlFiles = append(sqlFiles, filepath.Join(folder, file.Name()))
		}
	}

	sort.Strings(sqlFiles)

	for _, file := range sqlFiles {
		fmt.Printf("Running %s...\n", file)
		content, err := os.ReadFile(file)
		if err != nil {
			return fmt.Errorf("failed to read %s: %v", file, err)
		}

		_, err = conn.Exec(context.Background(), string(content))
		if err != nil {
			return fmt.Errorf("failed to execute %s: %v", file, err)
		}
	}

	return nil
}
