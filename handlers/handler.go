package handlers

import (
	"net/http"

	"github.com/simplicate/lynx/data"
)

func NewHandler(users data.UserStore) http.HandlerFunc {
	h := &Handler{Users: users}
	return func(w http.ResponseWriter, r *http.Request) {
		h.GetUser(w, r)
	}
}

// Handler handles requests
type Handler struct {
	Users data.UserStore
}
