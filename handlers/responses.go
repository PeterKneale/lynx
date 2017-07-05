package handlers

import "github.com/simplicate/lynx/data"

type UserResponse struct {
	ID        int    `json:"id"`
	Name      string `json:"Name"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type UsersResponse struct {
	Users []UserResponse `json:"users"`
	Total int            `json:"total"`
}

func ConvertUserToUserResponse(userdata *data.UserData) UserResponse {
	return UserResponse{
		ID:        userdata.ID,
		FirstName: userdata.FirstName,
		LastName:  userdata.LastName,
		Name:      userdata.FirstName + " " + userdata.LastName,
	}
}

func ConvertUsersToUserResponse(users []*data.UserData) []UserResponse {
	all := []UserResponse{}
	for _, user := range users {
		response := ConvertUserToUserResponse(user)
		all = append(all, response)
	}
	return all
}
