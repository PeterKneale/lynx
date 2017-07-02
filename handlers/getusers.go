package handlers

import (
	"encoding/json"
	"net/http"
)

// GetUsers returns all users
func (h *Handler) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.Users.List()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}
