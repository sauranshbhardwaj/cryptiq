package database

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shopspring/decimal"
	"log"
	"time"
)

type Balance struct {
	UserID      uuid.UUID       `json:"user_id"`
	Balance     decimal.Decimal `json:"balance"`
	LastUpdated time.Time       `json:"last_updated"`
}

func GetBalance(conn *pgxpool.Pool, userID uuid.UUID) (*Balance, error) {
	err := ensureBalanceExists(Pool, userID)
	if err != nil {
		log.Printf("failed to ensure balance exists: %v", err)
		return nil, err
	}

	query := `SELECT user_id, balance, last_updated FROM balances WHERE user_id = $1`

	var b Balance
	err = conn.QueryRow(context.Background(), query, userID).Scan(&b.UserID, &b.Balance, &b.LastUpdated)
	if err != nil {
		return nil, err
	}

	return &b, nil
}

func SetBalance(conn *pgxpool.Pool, userID uuid.UUID, amount decimal.Decimal) error {
	query := `
		INSERT INTO balances (user_id, balance, last_updated)
		VALUES ($1, $2, NOW())
		ON CONFLICT (user_id)
		DO UPDATE SET balance = EXCLUDED.balance, last_updated = NOW();
	`

	_, err := conn.Exec(context.Background(), query, userID, amount)
	if err != nil {
		return fmt.Errorf("failed to set balance: %v", err)
	}
	return nil
}

func ensureBalanceExists(conn *pgxpool.Pool, userID uuid.UUID) error {
	query := `
		INSERT INTO balances (user_id, balance, last_updated)
		VALUES ($1, 5000, NOW())
		ON CONFLICT DO NOTHING;
	`

	_, err := conn.Exec(context.Background(), query, userID)
	if err != nil {
		return fmt.Errorf("failed to initialize balance: %v", err)
	}
	return nil
}
