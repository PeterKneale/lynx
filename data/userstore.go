package data

import (
	"github.com/jinzhu/gorm"
	"math/rand"
)

//go:generate moq -out userstoremock.go . UserStore

type UserStore interface {
	Exists(id int) (bool, error)
	Get(id int) (*UserData, error)
	GetByEmail(email string) (*UserData, error)
	Delete(id int) error
	List() ([]*UserData, error)
	Create(user *UserData) error
	Count() (int, error)
}

func (db *DB) Count() (int, error) {
	count := 0
	db.Connection.Model(&UserData{}).Count(&count)
	return count, nil
}

func (db *DB) Exists(id int) (bool, error) {
	user, err := db.Get(id)
	if err != nil {
		return false, err
	}
	return user == nil, nil
}

func (db *DB) Get(id int) (*UserData, error) {
	var UserModel UserData
	if err := db.Connection.Find(&UserModel, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}
	return &UserModel, nil
}

func (db *DB) GetByEmail(email string) (*UserData, error) {
	var UserModel UserData
	// HACK - no email field
	if err := db.Connection.First(&UserModel, UserData{FirstName: email}).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}
	return &UserModel, nil
}

func (db *DB) Delete(id int) error {
	if err := db.Connection.Delete(&UserData{ID: id}).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil
		}
		return err
	}
	return nil
}

func (db *DB) List() ([]*UserData, error) {
	users := []*UserData{}
	if err := db.Connection.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (db *DB) Create(user *UserData) error {
	user.ID = rand.Intn(1000)
	if err := db.Connection.Save(user); err != nil {
		return err.Error
	}
	return nil
}
