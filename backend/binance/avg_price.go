package binance

import (
	"encoding/json"
	"fmt"
	"github.com/shopspring/decimal"
	"io"
	"net/http"
	"time"
)

type AvgPriceResponse struct {
	Mins      int    `json:"mins"`
	Price     string `json:"price"`
	CloseTime int64  `json:"closeTime"`
}

func GetAveragePrice(coinSymbol string) (decimal.Decimal, error) {
	url := fmt.Sprintf("https://api.binance.com/api/v3/avgPrice?symbol=%sUSDT", coinSymbol)

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		return decimal.Zero, fmt.Errorf("failed to fetch data: %v", err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			return
		}
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return decimal.Zero, fmt.Errorf("received non-OK response: %s", resp.Status)
	}

	var result AvgPriceResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return decimal.Zero, fmt.Errorf("failed to parse JSON response: %v", err)
	}

	price, err := decimal.NewFromString(result.Price)
	if err != nil {
		return decimal.Zero, fmt.Errorf("failed to convert price to decimal: %v", err)
	}

	return price, nil
}
