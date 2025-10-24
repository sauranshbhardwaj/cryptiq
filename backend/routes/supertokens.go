package routes

import (
	"encoding/json"
	"fmt"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/usermetadata"
	"net/http"
)

type NewPasswordRequestBody struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

type NewNameRequestBody struct {
	Name string `json:"name"`
}

func ChangePasswordAPI(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())

	var requestBody NewPasswordRequestBody
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userID := sessionContainer.GetUserID()

	userInfo, err := emailpassword.GetUserByID(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	isPasswordValid, err := emailpassword.SignIn(sessionContainer.GetTenantId(), userInfo.Email, requestBody.OldPassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if isPasswordValid.WrongCredentialsError != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	tenantId := sessionContainer.GetTenantId()
	updateResponse, err := emailpassword.UpdateEmailOrPassword(userID, &userInfo.Email, &requestBody.NewPassword, nil, &tenantId, nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if updateResponse.PasswordPolicyViolatedError != nil {
		http.Error(w, updateResponse.PasswordPolicyViolatedError.FailureReason, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write([]byte(`{"status":"success"}`))
	if err != nil {
		fmt.Println("failed to write response:", err)
		return
	}
}

func ChangeNameAPI(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())

	var requestBody NewNameRequestBody
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	name := requestBody.Name
	userID := sessionContainer.GetUserID()

	_, err = usermetadata.UpdateUserMetadata(userID, map[string]interface{}{
		"name": name,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write([]byte(`{"status":"success"}`))
	if err != nil {
		fmt.Println("failed to write response:", err)
		return
	}
}
