package database

import (
	"backend/utils"
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shopspring/decimal"
	"time"
)

type Transaction struct {
	TransactionID      uuid.UUID       `json:"transaction_id"`
	UserID             uuid.UUID       `json:"user_id"`
	Type               string          `json:"type"`
	Symbol             string          `json:"symbol"`
	Amount             decimal.Decimal `json:"amount"`
	ExchangeRate       decimal.Decimal `json:"exchange_rate"`
	TransactionCharges decimal.Decimal `json:"transaction_charges"`
	Total              decimal.Decimal `json:"total"`
	CreatedAt          time.Time       `json:"created_at"`
}

func CreateTransaction(conn *pgxpool.Pool, userID uuid.UUID, transType, symbol string, amount decimal.Decimal, calculation utils.TransactionCalculation) error {
	query := `INSERT INTO transactions (user_id, type, symbol, amount, exchange_rate, transaction_charges, total)
		VALUES ($1, $2, $3, $4, $5, $6, $7);`

	_, err := conn.Query(context.Background(), query, userID, transType, symbol, amount, calculation.ExchangeRate, calculation.TransactionCharges, calculation.Total)
	if err != nil {
		fmt.Println("failed to create transaction: ", err)
		return fmt.Errorf("failed to insert transaction: %v", err)
	}

	return nil
}

func GetTransactionsByUserID(conn *pgxpool.Pool, userID uuid.UUID) ([]Transaction, error) {
	query := `
		SELECT 
			transaction_id, user_id, type, symbol, amount, 
			exchange_rate, transaction_charges, total, created_at
		FROM 
			transactions
		WHERE 
			user_id = $1
		ORDER BY 
			created_at DESC;
	`

	rows, err := conn.Query(context.Background(), query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer rows.Close()

	var transactions []Transaction

	for rows.Next() {
		var t Transaction
		err := rows.Scan(
			&t.TransactionID,
			&t.UserID,
			&t.Type,
			&t.Symbol,
			&t.Amount,
			&t.ExchangeRate,
			&t.TransactionCharges,
			&t.Total,
			&t.CreatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan row: %v", err)
		}
		transactions = append(transactions, t)
	}

	if rows.Err() != nil {
		return nil, fmt.Errorf("row iteration error: %v", rows.Err())
	}

	return transactions, nil
}
