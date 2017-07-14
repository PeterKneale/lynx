package main

import (
	"fmt"
	"net/http"

	"github.com/caarlos0/env"
	"github.com/golang/glog"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/mssql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/simplicate/lynx/data"
	"github.com/simplicate/lynx/handlers"

	"flag"
	"os"
)

type config struct {
	APIPort    int    `env:"LYNX_API_PORT"    envDefault:"8080"`
	DBDialect  string `env:"LYNX_DB_DIALECT"  envDefault:"postgres"`
	DBDatabase string `env:"LYNX_DB_DATABASE" envDefault:"lynx"`
	DBHost     string `env:"LYNX_DB_HOST"     envDefault:"localhost"`
	DBUser     string `env:"LYNX_DB_USERNAME" envDefault:"admin"`
	DBPassword string `env:"LYNX_DB_PASSWORD" envDefault:"password"`
}

func usage() {
	fmt.Fprintf(os.Stderr, "usage: lynx -stderrthreshold=[INFO|WARN|FATAL] -log_dir=[string]\n")
	flag.PrintDefaults()
	os.Exit(2)
}

func main() {
	flag.Usage = usage
	flag.Parse()

	glog.Info("configuring")
	conf := config{}
	err := env.Parse(&conf)
	if err != nil {
		panic("could not parse config")
	}
	glog.Infof("config: %+v\n", conf)

	db, err := data.NewDB(conf.DBDialect, conf.DBHost, conf.DBDatabase, conf.DBUser, conf.DBPassword)
	if err != nil {
		glog.Fatal("could not connect to database", err)
	}
	defer db.Connection.Close()

	err = db.Migrate()
	if err != nil {
		glog.Fatal("could not migrate database", err)
	}

	handler := &handlers.Handler{Users: db}

	router := mux.NewRouter()

	router.HandleFunc("/api/users", handler.GetUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", handler.GetUser).Methods("GET")
	router.HandleFunc("/api/users/email/{email}", handler.GetUserByEmail).Methods("GET")
	router.HandleFunc("/api/users/{id}", handler.DeleteUser).Methods("DELETE")
	router.HandleFunc("/api/users", handler.CreateUser).Methods("POST")

	fs := http.FileServer(http.Dir("web/public"))
	router.Handle("/", fs)

	addr := fmt.Sprintf("0.0.0.0:%v", conf.APIPort)
	glog.Infof("listening: %s", addr)
	glog.Fatalf("exited %s", http.ListenAndServe(addr, router))
}
