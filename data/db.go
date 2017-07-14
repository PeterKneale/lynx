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
func NewDB(dialect, host, database, user, password string) (*DB, error) {
	connection := ""
	if dialect == "postgres" {
		connection = fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", host, user, database, password)
	}
	if dialect == "mssql" {
		connection = fmt.Sprintf("sqlserver://%s:%s@%s:1433?database=%s", user, password, host, database)
	}

	glog.Infof("opening db with dialect '%s' and connection '%s'", dialect, connection)

	gormdb, err := gorm.Open(dialect, connection)
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
