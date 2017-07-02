package data

type UserData struct {
	ID        int    `json:"id" gorm:"primary_key"`
	FirstName string `json:"firstName" gorm:"not null"`
	LastName  string `json:"lastName" gorm:"not null"`
}
