package handlers

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"
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

// GetUsers returns all users
func (h *Handler) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.Users.List()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}

// CreateUser creates a single user
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user data.UserData

	json.NewDecoder(r.Body).Decode(&user)

	h.Users.Create(&user)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(user)
}

// DeleteUser deletes a user
func (h *Handler) DeleteUser(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = h.Users.Delete(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
