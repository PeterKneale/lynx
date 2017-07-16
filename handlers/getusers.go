package handlers

import (
	"encoding/json"
	"github.com/simplicate/lynx/data"
	"net/http"
)

// GetUsers returns all users
func (h *Handler) GetUsers(w http.ResponseWriter, r *http.Request) {
	page := &data.PagedQuery{Page: 2, PageSize: 10, Order: "id asc"}
	users, err := h.Users.List(page)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	total, err := h.Users.Count()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	response := &UsersResponse{
		Users: ConvertUsersToUserResponse(users),
		Total: total,
	}

	json.NewEncoder(w).Encode(response)
}
