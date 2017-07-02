package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/simplicate/lynx/data"
)

// CreateUser creates a single user
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user data.UserData

	json.NewDecoder(r.Body).Decode(&user)

	h.Users.Create(&user)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(user)
}
