package database

import (
	"backend/binance"
	"backend/twelvedata"
	"backend/utils"
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/shopspring/decimal"
	"log"
	"sort"
	"strings"
	"time"
)

type UserNetWorth struct {
	UserID   uuid.UUID       `json:"user_id"`
	Name     string          `json:"name"`
	NetWorth decimal.Decimal `json:"net_worth"`
	Rank     int             `json:"rank,omitempty"`
}

type UserSPYXAUNetWorth struct {
	UserID uuid.UUID       `json:"user_id"`
	Name   string          `json:"name"`
	SPY    decimal.Decimal `json:"spy"`
	XAU    decimal.Decimal `json:"xau"`
}

type Portfolio struct {
	Coins map[string]decimal.Decimal `json:"coins"`
}

func GetPortfolioByUserID(conn *pgxpool.Pool, userID uuid.UUID) (*Portfolio, error) {
	err := ensurePortfolioExists(Pool, userID)
	if err != nil {
		log.Printf("failed to ensure portfolio exists: %v", err)
		return nil, err
	}

	row := conn.QueryRow(context.Background(), `
		SELECT BTC_qty,
		       ETH_qty,
		       BNB_qty,
		       XRP_qty,
		       ADA_qty,
		       DOGE_qty,
		       SOL_qty,
		       DOT_qty,
		       LTC_qty,
		       UNI_qty
		FROM portfolio
		WHERE user_id = $1
	`, userID)

	var (
		p     Portfolio
		coins = []string{"BTC", "ETH", "BNB", "XRP", "ADA", "DOGE", "SOL", "DOT", "LTC", "UNI"}
		qtys  = make([]decimal.Decimal, len(coins))
	)

	err = row.Scan(
		&qtys[0], &qtys[1], &qtys[2], &qtys[3], &qtys[4],
		&qtys[5], &qtys[6], &qtys[7], &qtys[8], &qtys[9],
	)
	if err != nil {
		return nil, err
	}

	p.Coins = make(map[string]decimal.Decimal)
	for i, symbol := range coins {
		p.Coins[symbol] = qtys[i]
	}

	return &p, nil
}

func GetTop10UsersByNetWorth(conn *pgxpool.Pool) ([]UserNetWorth, error) {
	query := `
		SELECT user_id, networth
		FROM portfolio
		ORDER BY networth DESC
		LIMIT 10;
	`

	rows, err := conn.Query(context.Background(), query)
	if err != nil {
		return nil, fmt.Errorf("failed to get top users: %v", err)
	}
	defer rows.Close()

	var results []UserNetWorth
	rank := 1
	for rows.Next() {
		var user UserNetWorth
		var net decimal.Decimal

		if err := rows.Scan(&user.UserID, &net); err != nil {
			return nil, err
		}
		user.NetWorth = net
		user.Rank = rank
		user.Name, err = utils.GetName(user.UserID.String())
		if err != nil {
			user.Name = "Anonymous"
		}

		rank++
		results = append(results, user)
	}

	return results, nil
}

func GetUserNetWorthRank(conn *pgxpool.Pool, userID uuid.UUID) (*UserNetWorth, error) {
	query := `
		SELECT rank, user_id, networth
		FROM (
			SELECT user_id, networth,
			RANK() OVER (ORDER BY networth DESC) as rank
			FROM portfolio
		) sub
		WHERE user_id = $1;
	`

	var result UserNetWorth

	err := conn.QueryRow(context.Background(), query, userID).
		Scan(&result.Rank, &result.UserID, &result.NetWorth)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, fmt.Errorf("user not found in portfolios")
		}
		return nil, fmt.Errorf("failed to get user rank: %v", err)
	}

	result.Name, err = utils.GetName(userID.String())
	if err != nil {
		result.Name = "Anonymous"
	}

	return &result, nil
}

func GetSPYandXAUNetworth(conn *pgxpool.Pool, userID uuid.UUID) (*UserSPYXAUNetWorth, error) {
	err := ensurePortfolioExists(Pool, userID)
	if err != nil {
		log.Printf("failed to ensure portfolio exists: %v", err)
		return nil, err
	}

	row := conn.QueryRow(context.Background(), `
		SELECT spy_qty,
		       xau_qty
		FROM portfolio
		WHERE user_id = $1
	`, userID)

	var (
		p    UserSPYXAUNetWorth
		qtys = make([]decimal.Decimal, 2)
	)

	err = row.Scan(
		&qtys[0], &qtys[1],
	)
	if err != nil {
		return nil, err
	}

	p.UserID = userID
	p.SPY = qtys[0]
	p.XAU = qtys[1]
	p.Name, err = utils.GetName(userID.String())

	return &p, nil
}

func GetNetworthHistoryByUser(conn *pgxpool.Pool, userID uuid.UUID) ([]map[string]interface{}, error) {
	query := `
		SELECT snapshot_time, networth, spy_networth, xau_networth
		FROM networth_snapshots
		WHERE user_id = $1
		ORDER BY snapshot_time DESC
		LIMIT 672
	`

	rows, err := conn.Query(context.Background(), query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %v", err)
	}
	defer rows.Close()

	var formattedData []map[string]interface{}

	for rows.Next() {
		var snapshotTime time.Time
		var networth, spyNetworth, xauNetworth float64

		if err := rows.Scan(&snapshotTime, &networth, &spyNetworth, &xauNetworth); err != nil {
			return nil, fmt.Errorf("failed to scan row: %v", err)
		}

		formattedTime := snapshotTime.Format(time.RFC3339)

		dataPoint := map[string]interface{}{
			"timestamp":    formattedTime,
			"networth":     networth,
			"spy_networth": spyNetworth,
			"xau_networth": xauNetworth,
		}

		formattedData = append(formattedData, dataPoint)
	}

	sort.Slice(formattedData, func(i, j int) bool {
		timeI, errI := time.Parse(time.RFC3339, formattedData[i]["timestamp"].(string))
		timeJ, errJ := time.Parse(time.RFC3339, formattedData[j]["timestamp"].(string))

		if errI != nil || errJ != nil {
			return false
		}

		return timeI.Before(timeJ)
	})

	return formattedData, nil
}

func UpdateSPYandXAUNetworth(conn *pgxpool.Pool, userID uuid.UUID, spyQty, xauQty decimal.Decimal) error {
	setClause := ""
	args := []interface{}{userID}
	argPos := 2

	if spyQty.LessThan(decimal.Zero) {
		spyQty = decimal.Zero
	}

	if xauQty.LessThan(decimal.Zero) {
		xauQty = decimal.Zero
	}

	setClause += fmt.Sprintf("spy_qty = $%d, ", argPos)
	args = append(args, spyQty)
	argPos++

	setClause += fmt.Sprintf("xau_qty = $%d, ", argPos)
	args = append(args, xauQty)
	argPos++
	
	if setClause == "" {
		return nil
	}
	setClause = strings.TrimSuffix(setClause, ", ")

	query := fmt.Sprintf(`
		INSERT INTO portfolio (user_id, %s)
		VALUES ($1, %s)
		ON CONFLICT (user_id) DO UPDATE
		SET %s;
	`, // columns and values
		strings.Join(getKeysWithSuffix(map[string]decimal.Decimal{"spy": spyQty, "xau": xauQty}, "_qty"), ", "),
		strings.Join(getParamPlaceholders(2, len(args)-1), ", "),
		setClause,
	)
	_, err := conn.Exec(context.Background(), query, args...)
	if err != nil {
		return fmt.Errorf("failed to update portfolio: %v", err)
	}
	return nil
}

func UpdateSPYXAUPricesPeriodically(conn *pgxpool.Pool) {
	ticker := time.NewTicker(20 * time.Second)

	go func() {
		for range ticker.C {
			err := updateSPYXAUPrices(conn)
			if err != nil {
				log.Printf("Error updating spy and xau prices: %v", err)
				continue
			}
		}
	}()
}

func UpdateCoinPricesPeriodically(conn *pgxpool.Pool) {
	ticker := time.NewTicker(20 * time.Second)

	go func() {
		for range ticker.C {
			err := updateAllCoinPrices(conn)
			if err != nil {
				log.Printf("Error updating coin prices: %v", err)
				continue
			}
		}
	}()
}

func UpdatePortfolioQuantities(conn *pgxpool.Pool, userID uuid.UUID, coinQuantities map[string]decimal.Decimal) error {
	setClause := ""
	args := []interface{}{userID}
	argPos := 2

	for coin, qty := range coinQuantities {
		setClause += fmt.Sprintf("%s_qty = $%d, ", strings.ToLower(coin), argPos)
		args = append(args, qty)
		argPos++
	}
	if setClause == "" {
		return nil
	}
	setClause = strings.TrimSuffix(setClause, ", ")

	query := fmt.Sprintf(`
		INSERT INTO portfolio (user_id, %s)
		VALUES ($1, %s)
		ON CONFLICT (user_id) DO UPDATE
		SET %s;
	`, // columns and values
		strings.Join(getKeysWithSuffix(coinQuantities, "_qty"), ", "),
		strings.Join(getParamPlaceholders(2, len(coinQuantities)), ", "),
		setClause,
	)
	_, err := conn.Exec(context.Background(), query, args...)
	if err != nil {
		return fmt.Errorf("failed to update portfolio: %v", err)
	}
	return nil
}

func getKeysWithSuffix(m map[string]decimal.Decimal, suffix string) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, strings.ToLower(k)+suffix)
	}
	return keys
}

func getParamPlaceholders(start, count int) []string {
	placeholders := make([]string, count)
	for i := 0; i < count; i++ {
		placeholders[i] = fmt.Sprintf("$%d", start+i)
	}
	return placeholders
}

func updateAllCoinPrices(conn *pgxpool.Pool) error {
	args := []interface{}{}
	setClause := ""
	argPos := 1

	for coin := range utils.Coins.Items() {
		price, err := binance.GetAveragePrice(strings.ToUpper(coin))
		if err != nil {
			return fmt.Errorf("failed to fetch price for %s: %v", coin, err)
		}
		setClause += fmt.Sprintf("%s_price = $%d, ", strings.ToLower(coin), argPos)
		args = append(args, price)
		argPos++
	}
	if setClause == "" {
		return nil
	}
	setClause = strings.TrimSuffix(setClause, ", ")

	query := fmt.Sprintf(`
		UPDATE portfolio
		SET %s;
	`, setClause)

	_, err := conn.Exec(context.Background(), query, args...)
	return err
}

func updateSPYXAUPrices(conn *pgxpool.Pool) error {
	args := []interface{}{}
	setClause := ""
	argPos := 1
	items := []string{"spy", "xau"}

	for _, commodities := range items {
		var price decimal.Decimal

		if commodities == "spy" {
			price = twelvedata.GetCurrentSPYPrice()
		} else {
			price = twelvedata.GetCurrentXAUPrice()
		}

		setClause += fmt.Sprintf("%s_price = $%d, ", strings.ToLower(commodities), argPos)
		args = append(args, price)
		argPos++
	}
	if setClause == "" {
		return nil
	}
	setClause = strings.TrimSuffix(setClause, ", ")

	query := fmt.Sprintf(`
		UPDATE portfolio
		SET %s;
	`, setClause)

	_, err := conn.Exec(context.Background(), query, args...)
	return err
}

func ensurePortfolioExists(pool *pgxpool.Pool, userID uuid.UUID) error {
	_, err := pool.Exec(context.Background(), `
		INSERT INTO portfolio (user_id)
		VALUES ($1)
		ON CONFLICT (user_id) DO NOTHING
	`, userID)
	return err
}
