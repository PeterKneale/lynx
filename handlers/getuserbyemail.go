package handlers

import (
	"encoding/json"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"
)

// GetUserByEmail returns a user
func (h *Handler) GetUserByEmail(w http.ResponseWriter, r *http.Request) {
	email, err := url.QueryUnescape(mux.Vars(r)["email"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, err := h.Users.GetByEmail(email)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if user == nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(user)
}
