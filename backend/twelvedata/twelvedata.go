package twelvedata

import (
	"encoding/json"
	"fmt"
	"github.com/shopspring/decimal"
	"io/ioutil"
	"net/http"
	"os"
	"sync"
	"time"
)

type PriceResponse struct {
	Price decimal.Decimal `json:"price"`
}

var (
	currentSPYPrice = decimal.NewFromInt(1)
	mu              sync.RWMutex
	currentXAUPrice = decimal.NewFromInt(1)
	mu1             sync.RWMutex
)

func Init() {
	go fetchSPYPrice()
	go fetchXAUPrice()
}

func GetCurrentSPYPrice() decimal.Decimal {
	mu.RLock()
	defer mu.RUnlock()
	return currentSPYPrice
}

func GetCurrentXAUPrice() decimal.Decimal {
	mu1.RLock()
	defer mu1.RUnlock()
	return currentXAUPrice
}

func fetchSPYPrice() {
	url := fmt.Sprintf("https://api.twelvedata.com/price?symbol=SPY&apikey=%s", os.Getenv("TWELVEDATA_API_KEY_SPY"))

	for {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("Error fetching price:", err)
			time.Sleep(120 * time.Second)
			continue
		}
		body, err := ioutil.ReadAll(resp.Body)
		err = resp.Body.Close()
		if err != nil {
			fmt.Println("Error closing response:", err)
			return
		}
		if err != nil {
			fmt.Println("Error reading response:", err)
			time.Sleep(120 * time.Second)
			continue
		}

		var priceResp PriceResponse
		if err := json.Unmarshal(body, &priceResp); err != nil {
			fmt.Println("Error parsing JSON:", err)
			time.Sleep(120 * time.Second)
			continue
		}

		mu.Lock()
		currentSPYPrice = priceResp.Price
		mu.Unlock()

		time.Sleep(120 * time.Second)
	}
}

func fetchXAUPrice() {
	url := fmt.Sprintf("https://api.twelvedata.com/price?symbol=XAU/USD&apikey=%s", os.Getenv("TWELVEDATA_API_KEY_XAU"))

	for {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("Error fetching price:", err)
			time.Sleep(120 * time.Second)
			continue
		}
		body, err := ioutil.ReadAll(resp.Body)
		err = resp.Body.Close()
		if err != nil {
			fmt.Println("Error closing response:", err)
			return
		}
		if err != nil {
			fmt.Println("Error reading response:", err)
			time.Sleep(120 * time.Second)
			continue
		}

		var priceResp PriceResponse
		if err := json.Unmarshal(body, &priceResp); err != nil {
			fmt.Println("Error parsing JSON:", err)
			time.Sleep(120 * time.Second)
			continue
		}

		mu1.Lock()
		currentXAUPrice = priceResp.Price
		mu1.Unlock()

		time.Sleep(120 * time.Second)
	}
}
