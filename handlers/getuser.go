package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/golang/glog"
	"github.com/gorilla/mux"
)

// GetUser returns a user by id
func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(mux.Vars(r)["id"])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if id < 1 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	userdata, err := h.Users.Get(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		glog.Infof("Error loading user %d", id)
		return
	}

	if userdata == nil {
		w.WriteHeader(http.StatusNotFound)
		glog.Infof("User %d not found", id)
		return
	}

	user := ConvertUserToUserResponse(userdata)

	json.NewEncoder(w).Encode(user)
}
