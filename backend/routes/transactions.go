package routes

import (
	"backend/database"
	"backend/twelvedata"
	"backend/utils"
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"net/http"
	"strings"
)

func AddTransaction(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Type   string          `json:"type"`
		Symbol string          `json:"symbol"`
		Amount decimal.Decimal `json:"amount"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if !utils.Coins.Contains(strings.ToUpper(req.Symbol)) {
		http.Error(w, "Invalid symbol", http.StatusBadRequest)
		return
	}

	if !utils.TransactionType.Contains(strings.ToUpper(req.Type)) {
		http.Error(w, "Invalid type", http.StatusBadRequest)
		return
	}

	if req.Amount.LessThan(decimal.NewFromFloat(0)) {
		http.Error(w, "Invalid amount", http.StatusBadRequest)
		return
	}

	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	userIDStr := sessionContainer.GetUserID()
	userID, err := uuid.Parse(userIDStr)

	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	balance, err := database.GetBalance(database.Pool, userID)
	if err != nil {
		http.Error(w, "User not found or database error", http.StatusNotFound)
		return
	}

	portfolio, err := database.GetPortfolioByUserID(database.Pool, userID)
	if err != nil {
		fmt.Printf("failed to get portfolio: %s", err.Error())
		http.Error(w, "Failed to get portfolio", http.StatusInternalServerError)
		return
	}

	calculation, err := utils.CalculateTotal(req.Symbol, req.Amount, req.Type)
	if err != nil {
		fmt.Printf("failed to calculate total: %v", err)
		http.Error(w, "Failed to calculate total", http.StatusInternalServerError)
		return
	}

	var updatedBalance decimal.Decimal
	var symbolAmount decimal.Decimal

	switch strings.ToUpper(req.Type) {
	case "BUY":
		if balance.Balance.LessThan(calculation.Total) {
			fmt.Printf("insufficient balance: %s < %s", balance.Balance.String(), calculation.Total.String())
			http.Error(w, "Insufficient balance", http.StatusBadRequest)
			return
		}

		updatedBalance = balance.Balance.Sub(calculation.Total)
		symbolAmount = req.Amount

		break
	case "SELL":
		if portfolio.Coins[strings.ToUpper(req.Symbol)].LessThan(req.Amount) {
			fmt.Printf("insufficient coins: %s < %s", portfolio.Coins[strings.ToUpper(req.Symbol)].String(), req.Amount.String())
			http.Error(w, "Insufficient coins", http.StatusBadRequest)
			return
		}

		updatedBalance = balance.Balance.Add(calculation.Total)
		symbolAmount = req.Amount.Mul(decimal.NewFromInt(-1))

		break
	default:
		// It should never reach here due to the check above
		break
	}

	err = database.CreateTransaction(database.Pool, userID, req.Type, req.Symbol, req.Amount, calculation)
	if err != nil {
		fmt.Printf("failed to create transaction: %s", err.Error())
		http.Error(w, "Failed to add transaction", http.StatusInternalServerError)
		return
	}

	err = database.SetBalance(database.Pool, userID, updatedBalance)
	if err != nil {
		fmt.Printf("failed to update balance: %v", err)
		http.Error(w, "Failed to update balance", http.StatusInternalServerError)
		return
	}

	networth, err := database.GetSPYandXAUNetworth(database.Pool, userID)
	if err != nil {
		fmt.Printf("failed to get networth: %s", err.Error())
		http.Error(w, "Failed to get networth", http.StatusInternalServerError)
		return
	}

	qtyXAUsub := calculation.ExchangeRate.Mul(req.Amount).Div(twelvedata.GetCurrentXAUPrice())
	qtySPYsub := calculation.ExchangeRate.Mul(req.Amount).Div(twelvedata.GetCurrentSPYPrice())
	var updatedSPYBalance, updatedXAUBalance decimal.Decimal

	if strings.ToUpper(req.Type) == "BUY" {
		updatedSPYBalance = networth.SPY.Add(qtySPYsub)
		updatedXAUBalance = networth.XAU.Add(qtyXAUsub)
	} else {
		updatedSPYBalance = networth.SPY.Sub(qtySPYsub)
		updatedXAUBalance = networth.XAU.Sub(qtyXAUsub)
	}

	err = database.UpdateSPYandXAUNetworth(database.Pool, userID, updatedSPYBalance, updatedXAUBalance)
	if err != nil {
		fmt.Printf("failed to update gold and spy networth: %s", err.Error())
		http.Error(w, "Failed to update gold and spy networth", http.StatusInternalServerError)
		return
	}

	err = database.UpdatePortfolioQuantities(database.Pool, userID, map[string]decimal.Decimal{
		strings.ToUpper(req.Symbol): portfolio.Coins[strings.ToUpper(req.Symbol)].Add(symbolAmount),
	})
	if err != nil {
		fmt.Printf("failed to update portfolio: %s", err.Error())
		http.Error(w, "Failed to update portfolio", http.StatusInternalServerError)
		return
	}

	resp := map[string]string{
		"status": "OK",
		"total":  calculation.Total.String(),
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(resp)
	if err != nil {
		fmt.Printf("failed to encode response: %v", err)
		return
	}
}

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	userIDStr := sessionContainer.GetUserID()
	userID, err := uuid.Parse(userIDStr)

	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	transactions, err := database.GetTransactionsByUserID(database.Pool, userID)
	if err != nil {
		fmt.Println("failed to get transactions: ", err)
		http.Error(w, "Failed to fetch transactions", http.StatusInternalServerError)
		return
	}

	if transactions == nil {
		transactions = []database.Transaction{}
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(transactions)
	if err != nil {
		fmt.Println("failed to encode transactions: ", err)
		return
	}
}
