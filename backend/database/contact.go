package database

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
)

func AddContactMessage(conn *pgxpool.Pool, name, email, message string) error {
	query := `
		INSERT INTO contact (name, email, message)
		VALUES ($1, $2, $3)
	`
	_, err := conn.Exec(context.Background(), query, name, email, message)
	if err != nil {
		return fmt.Errorf("failed to insert contact message: %w", err)
	}
	return nil
}
