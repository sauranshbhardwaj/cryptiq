package routes

import (
	"backend/binance"
	"backend/database"
	"backend/twelvedata"
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"log"
	"net/http"
	"sync"
	"time"
)

var (
	coins      = []string{"ADA", "BNB", "BTC", "DOGE", "DOT", "ETH", "LTC", "SOL", "UNI", "XRP"}
	priceMap   = make(map[string]string)
	priceMutex sync.RWMutex
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func GetTop10Networth(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to upgrade connection:", err)
		return
	}
	defer func(ws *websocket.Conn) {
		err := ws.Close()
		if err != nil {
			return
		}
	}(ws)

	sendTopUsers(ws)
}

func GetUserNetworth(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	userIDStr := sessionContainer.GetUserID()
	userID, err := uuid.Parse(userIDStr)

	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	user, err := database.GetUserNetWorthRank(database.Pool, userID)
	if err != nil {
		http.Error(w, "Failed to get user net worth", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		fmt.Println("failed to encode networth:", err)
		return
	}
}

func GetPortfolio(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	userIDStr := sessionContainer.GetUserID()
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	portfolio, err := database.GetPortfolioByUserID(database.Pool, userID)
	if err != nil {
		fmt.Printf("failed to get portfolio: %v\n", err)
		http.Error(w, "Failed to retrieve portfolio", http.StatusInternalServerError)
		return
	}

	resp := map[string]interface{}{
		"portfolio": portfolio.Coins,
		"price":     getPrice(),
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		fmt.Printf("failed to encode response: %v\n", err)
		return
	}
}

func GetHistoricNetworth(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	userIDStr := sessionContainer.GetUserID()
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	historicNetworth, err := database.GetNetworthHistoryByUser(database.Pool, userID)
	if err != nil {
		fmt.Printf("failed to get historic networth: %v\n", err)
		http.Error(w, "Failed to retrieve historic networth", http.StatusInternalServerError)
		return
	}

	if historicNetworth == nil {
		historicNetworth = []map[string]interface{}{}
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(historicNetworth); err != nil {
		fmt.Printf("failed to encode response: %v\n", err)
		return
	}
}

func GetXAUSPYPortfolio(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())
	userIDStr := sessionContainer.GetUserID()
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	portfolio, err := database.GetSPYandXAUNetworth(database.Pool, userID)
	if err != nil {
		fmt.Printf("failed to get portfolio: %v\n", err)
		http.Error(w, "Failed to retrieve portfolio", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]interface{}{
		"portfolio": portfolio,
		"price": map[string]string{
			"SPY": twelvedata.GetCurrentSPYPrice().String(),
			"XAU": twelvedata.GetCurrentXAUPrice().String(),
		},
	}); err != nil {
		fmt.Printf("failed to encode response: %v\n", err)
		return
	}
}

func Init() {
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			fetchPrices()
		}
	}
}

func sendTopUsers(ws *websocket.Conn) {
	for {
		users, err := database.GetTop10UsersByNetWorth(database.Pool)
		if err != nil {
			log.Printf("Failed to get top 10 users: %v", err)
			break
		}

		if users == nil {
			users = []database.UserNetWorth{}
		}

		usersJSON, err := json.Marshal(users)
		if err != nil {
			log.Printf("Failed to encode users to JSON: %v", err)
			break
		}

		err = ws.WriteMessage(websocket.TextMessage, usersJSON)
		if err != nil {
			log.Printf("Failed to send message: %v", err)
			break
		}

		time.Sleep(10 * time.Second)
	}
}

func fetchPrices() {
	for _, coin := range coins {
		price, err := binance.GetAveragePrice(coin)
		if err != nil {
			log.Printf("Error fetching price for %s: %v", coin, err)
			priceMutex.Lock()
			priceMap[coin] = "0"
			priceMutex.Unlock()
			continue
		}

		priceMutex.Lock()
		priceMap[coin] = price.String()
		priceMutex.Unlock()
	}
}

func getPrice() map[string]string {
	priceMutex.RLock()
	defer priceMutex.RUnlock()

	return priceMap
}
