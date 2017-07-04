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

	userResponses := ConvertUsersToUserResponse(users)
	response := &UsersResponse{Users: userResponses, Total: 0}

	json.NewEncoder(w).Encode(response)
}
