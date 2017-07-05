package handlers

import (
	"encoding/json"
	"net/http"

	"fmt"

	"github.com/golang/glog"
	"github.com/simplicate/lynx/data"
)

// CreateUser creates a single user
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user data.UserData

	json.NewDecoder(r.Body).Decode(&user)

	if user.FirstName == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if user.LastName == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err := h.Users.Create(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		glog.Warning("Error creating user")
		return
	}

	response := ConvertUserToUserResponse(&user)

	w.WriteHeader(http.StatusCreated)
	w.Header().Add("Location", fmt.Sprintf("/api/users/%d", response.ID))

	json.NewEncoder(w).Encode(response)
}
