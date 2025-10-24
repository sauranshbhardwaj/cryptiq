package routes

import (
	"backend/utils"
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
	"github.com/shopspring/decimal"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

var (
	clients     = make(map[string]map[*websocket.Conn]bool)
	clientsLock = sync.RWMutex{}
)

type BinanceMessage struct {
	Stream string `json:"stream"`
	Data   struct {
		Symbol string `json:"s"`
		Price  string `json:"w"`
	} `json:"data"`
}

type LinePoint struct {
	Timestamp int64           `json:"timestamp"`
	Close     decimal.Decimal `json:"close"`
}
type Ticker24hr struct {
	PriceChangePercent string `json:"priceChangePercent"`
}

func BinanceInit() {
	for {
		err := connectToBinance()
		if err != nil {
			log.Println("Error with Binance connection:", err)
		}
		log.Println("Reconnecting in 5 seconds...")
		time.Sleep(5 * time.Second)
	}
}

func GetHistoricData(w http.ResponseWriter, r *http.Request) {
	symbol := strings.ToUpper(chi.URLParam(r, "coin"))
	timeFrame := chi.URLParam(r, "time")

	if !utils.Coins.Contains(strings.Replace(symbol, "USDT", "", -1)) {
		http.Error(w, "Unsupported coin: "+symbol, http.StatusBadRequest)
		return
	}
	var data []LinePoint
	var err error = nil

	switch timeFrame {
	case "2m":
		data, err = getLineGraphData(symbol, "1s", time.Now().Add(-120*time.Second).UnixMicro())
		break
	case "1d":
		data, err = getLineGraphData(symbol, "15m", time.Now().AddDate(0, 0, -1).UnixMicro())
		break
	case "5d":
		data, err = getLineGraphData(symbol, "30m", time.Now().AddDate(0, 0, -5).UnixMicro())
		break
	case "1M":
		data, err = getLineGraphData(symbol, "1d", time.Now().AddDate(0, -1, 0).UnixMicro())
		break
	case "6M":
		data, err = getLineGraphData(symbol, "1d", time.Now().AddDate(-6, 0, 0).UnixMicro())
		break
	case "YTD":
		data, err = getLineGraphData(symbol, "1d", time.Now().AddDate(0, 0, -1*int(time.Now().YearDay())).UnixMicro())
		break
	case "1Y":
		data, err = getLineGraphData(symbol, "1d", time.Now().AddDate(-1, 0, 0).UnixMicro())
		break
	default:
		http.Error(w, "Unsupported timeframe: "+symbol, http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(data)
	if err != nil {
		fmt.Println("failed to encode response")
		return
	}
}

func GetPriceChangePercent(w http.ResponseWriter, r *http.Request) {
	url := "https://api.binance.com/api/v3/ticker/24hr?symbols=[\"BTCUSDT\",\"ETHUSDT\",\"BNBUSDT\",\"XRPUSDT\",\"ADAUSDT\",\"DOGEUSDT\",\"SOLUSDT\",\"DOTUSDT\",\"LTCUSDT\",\"UNIUSDT\"]"

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch data from Binance API", http.StatusInternalServerError)
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing body:", err)
			return
		}
	}(resp.Body)

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusInternalServerError)
		return
	}

	result := make(map[string]string)
	for _, entry := range data {
		symbol, ok1 := entry["symbol"].(string)
		change, ok2 := entry["priceChangePercent"].(string)
		if ok1 && ok2 {
			result[symbol] = change
		}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		fmt.Println("failed to encode response:", err)
		return
	}
}

func CryptoWebsocket(w http.ResponseWriter, r *http.Request) {
	coin := strings.ToUpper(chi.URLParam(r, "coin"))

	if ok := utils.Coins.Contains(strings.Replace(coin, "USDT", "", -1)); !ok {
		http.Error(w, "Unsupported coin: "+coin, http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	clientsLock.Lock()
	if clients[coin] == nil {
		clients[coin] = make(map[*websocket.Conn]bool)
	}
	clients[coin][conn] = true
	clientsLock.Unlock()

	defer func() {
		clientsLock.Lock()
		delete(clients[coin], conn)
		err := conn.Close()
		if err != nil {
			fmt.Println("Error closing connection:", err)
			return
		}
		clientsLock.Unlock()
	}()

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			break
		}
	}
}

func getLineGraphData(symbol string, interval string, startTime int64) ([]LinePoint, error) {
	url := fmt.Sprintf("https://api.binance.com/api/v3/klines?symbol=%s&interval=%s&startTime=%d", symbol, interval, startTime)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body: ", err)
		}
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("binance API returned status %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body failed: %w", err)
	}

	var klines [][]interface{}
	if err := json.Unmarshal(body, &klines); err != nil {
		return nil, fmt.Errorf("unmarshal error: %w", err)
	}

	var result []LinePoint
	for _, kline := range klines {
		if len(kline) < 5 {
			continue
		}

		timestamp, ok1 := kline[0].(float64)
		closeStr, ok2 := kline[4].(string)
		if !ok1 || !ok2 {
			continue
		}

		closePrice, err := decimal.NewFromString(closeStr)
		if err != nil {
			continue
		}

		result = append(result, LinePoint{
			Timestamp: int64(timestamp),
			Close:     closePrice,
		})
	}

	return result, nil
}

func connectToBinance() error {
	url := "wss://stream.binance.com:9443/stream?streams=btcusdt@avgPrice/ethusdt@avgPrice/bnbusdt@avgPrice/xrpusdt@avgPrice/adausdt@avgPrice/dogeusdt@avgPrice/solusdt@avgPrice/dotusdt@avgPrice/ltcusdt@avgPrice/uniusdt@avgPrice"

	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		return err
	}
	defer func(conn *websocket.Conn) {
		err := conn.Close()
		if err != nil {
			fmt.Println("Error closing connection:", err)
			return
		}
	}(conn)

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return err
		}

		var binanceMsg BinanceMessage
		if err := json.Unmarshal(msg, &binanceMsg); err != nil {
			fmt.Println("Unmarshal error:", err)
			continue
		}

		symbol := binanceMsg.Data.Symbol
		clientsLock.RLock()
		for conn := range clients[symbol] {
			if err := conn.WriteJSON(binanceMsg); err != nil {
				log.Println("Write error:", err)
				err := conn.Close()
				if err != nil {
					fmt.Println("Error closing connection:", err)
				}
				delete(clients[symbol], conn)
			}
		}
		clientsLock.RUnlock()
	}
}
