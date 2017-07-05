package handlers

import (
	"net/http"

	"github.com/simplicate/lynx/data"
)

// Handler handles requests
type Handler struct {
	Users data.UserStore
}

func NewGetUserHandler(users data.UserStore) http.HandlerFunc {
	h := &Handler{Users: users}
	return func(w http.ResponseWriter, r *http.Request) {
		h.GetUser(w, r)
	}
}

func NewGetUsersHandler(users data.UserStore) http.HandlerFunc {
	h := &Handler{Users: users}
	return func(w http.ResponseWriter, r *http.Request) {
		h.GetUsers(w, r)
	}
}

func NewDeleteUserHandler(users data.UserStore) http.HandlerFunc {
	h := &Handler{Users: users}
	return func(w http.ResponseWriter, r *http.Request) {
		h.DeleteUser(w, r)
	}
}
