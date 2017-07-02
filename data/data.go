package data

type UserData struct {
	ID        int    `gorm:"primary_key"`
	FirstName string `gorm:"not null"`
	LastName  string `gorm:"not null"`
}
