package routes

import (
	"backend/database"
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"net/http"
)

func GetBalance(w http.ResponseWriter, r *http.Request) {
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

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(balance)

	if err != nil {
		fmt.Println("failed to encode balance: ", err)
		return
	}
}
