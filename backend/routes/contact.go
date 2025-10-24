package routes

import (
	"backend/database"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/mail"
)

type ContactMessage struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func AddContactForm(w http.ResponseWriter, r *http.Request) {
	var msg ContactMessage
	if err := json.NewDecoder(r.Body).Decode(&msg); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if msg.Name == "" || msg.Email == "" || msg.Message == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}

	_, err := mail.ParseAddress(msg.Email)

	if err != nil {
		http.Error(w, "Invalid email", http.StatusBadRequest)
		return
	}

	if err := database.AddContactMessage(database.Pool, msg.Name, msg.Email, msg.Message); err != nil {
		http.Error(w, "Failed to save message", http.StatusInternalServerError)
		log.Println("Insert error:", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")

	_, err = w.Write([]byte(`{"status":"success"}`))
	if err != nil {
		fmt.Println("failed to write response:", err)
		return
	}
}
