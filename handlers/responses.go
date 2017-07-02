package handlers

type UserResponse struct {
	ID        int    `json:"id"`
	Name      string `json:"Name"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}
