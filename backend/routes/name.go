package routes

import (
	"backend/utils"
	"fmt"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"net/http"
)

func GetName(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())

	userID := sessionContainer.GetUserID()

	name, err := utils.GetName(userID)
	if err != nil {
		http.Error(w, "Error getting name", http.StatusInternalServerError)
		fmt.Println("Error getting name: ", err)
	}

	_, err = w.Write([]byte(name))
	if err != nil {
		fmt.Println("Error writing response: ", err)
		return
	}
}
