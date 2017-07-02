package data

import (
	"fmt"

	"github.com/golang/glog"
	"github.com/jinzhu/gorm"
)

// DB represents a database and its connection
type DB struct {
	Connection *gorm.DB
}

// NewDB creates a new database with an open connection
func NewDB(host, database, user, password string) (*DB, error) {
	connection := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", host, user, database, password)

	glog.Infof("opening db: '%s'", connection)

	gormdb, err := gorm.Open("postgres", connection)
	if err != nil {
		glog.Error("error opening")
		return nil, err
	}
	if gormdb.Error != nil {
		glog.Error("error returned")
		return nil, err
	}

	gormdb.LogMode(true)

	db := &DB{Connection: gormdb}
	return db, nil
}

// Migrate the schema to the latest version
func (db *DB) Migrate() error {
	db.Connection.AutoMigrate(&UserData{})
	return nil
}
