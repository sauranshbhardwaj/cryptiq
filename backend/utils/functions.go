package utils

import (
	"backend/binance"
	"bytes"
	"fmt"
	"github.com/shopspring/decimal"
	"github.com/supertokens/supertokens-golang/recipe/usermetadata"
	"io"
	"net/http"
	"os"
	"strings"
)

type TransactionCalculation struct {
	ExchangeRate       decimal.Decimal
	Total              decimal.Decimal
	TransactionCharges decimal.Decimal
}

func Post(url string, headers map[string]string, body []byte) (*http.Response, error) {
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	for key, value := range headers {
		req.Header.Set(key, value)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %w", err)
	}

	return resp, nil
}

func SetupAdminUser() {
	url := "http://supertokens:3567/recipe/dashboard/user"
	headers := map[string]string{
		"Content-Type": "application/json",
		"rid":          "dashboard",
		"api-key":      os.Getenv("SUPERTOKENS_API_KEY"),
	}

	body := []byte(fmt.Sprintf("{\"email\": \"%s\", \"password\":\"%s\"}",
		os.Getenv("BACKEND_ADMIN_EMAIL"),
		os.Getenv("BACKEND_ADMIN_PASSWORD")))

	resp, err := Post(url, headers, body)
	if err != nil {
		fmt.Println("Error: ", err)
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body: ", err)
		}
	}(resp.Body)
}

func CalculateTotal(symbol string, amount decimal.Decimal, transactionType string) (TransactionCalculation, error) {
	exchangeRate, err := binance.GetAveragePrice(strings.ToUpper(symbol))
	if err != nil {
		return TransactionCalculation{}, fmt.Errorf("failed to get average price: %v", err)
	}

	var total decimal.Decimal
	var transactionCharges decimal.Decimal

	if strings.ToUpper(transactionType) == "SELL" {
		transactionCharges = amount.Mul(exchangeRate).Mul(TransactionCharges)
		total = (amount.Mul(exchangeRate)).Sub(transactionCharges)

		return TransactionCalculation{
			ExchangeRate:       exchangeRate,
			Total:              total,
			TransactionCharges: transactionCharges,
		}, nil
	}

	transactionCharges = amount.Mul(exchangeRate).Mul(TransactionCharges)
	total = (amount.Mul(exchangeRate)).Add(transactionCharges)

	return TransactionCalculation{
		ExchangeRate:       exchangeRate,
		Total:              total,
		TransactionCharges: transactionCharges,
	}, nil
}

func GetName(userID string) (string, error) {
	metadata, err := usermetadata.GetUserMetadata(userID)
	if err != nil {
		fmt.Println("Error getting user metadata: ", err)
		return "", err
	}

	if metadata["name"] == nil {
		return "", fmt.Errorf("user %s does not have a name", userID)
	}

	return metadata["name"].(string), nil
}
