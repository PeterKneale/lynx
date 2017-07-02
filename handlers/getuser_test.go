package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"

	"errors"

	"github.com/gorilla/mux"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/simplicate/lynx/data"
)

var _ = Describe(`Get User Handler`, func() {
	var (
		recorder *httptest.ResponseRecorder
		router   *mux.Router

		// deps
		userstore *data.UserStoreMock

		// inputs
		id string

		// result
		statuscode   int
		userResponse *UserResponse
	)

	BeforeEach(func() {
		userstore = &data.UserStoreMock{}
		handler := NewHandler(userstore)

		router = mux.NewRouter()
		router.Handle("/api/users/{id}", handler).Methods("GET")
		recorder = httptest.NewRecorder()
	})

	JustBeforeEach(func() {
		request, _ := http.NewRequest("GET", fmt.Sprintf("/api/users/%s", id), nil)
		router.ServeHTTP(recorder, request)

		statuscode = recorder.Code
		b, _ := ioutil.ReadAll(recorder.Body)
		json.Unmarshal(b, &userResponse)
	})
	Describe("loading from data store", func() {
		Context(`and finding a record`, func() {
			BeforeEach(func() {
				id = "1"
				userstore.GetFunc = func(id int) (*data.UserData, error) {
					return &data.UserData{ID: id, FirstName: "peter", LastName: "kneale"}, nil
				}
			})
			It(`Should return status code OK`, func() {
				Expect(statuscode).To(Equal(http.StatusOK))
			})
			It(`Should return response containing`, func() {
				Expect(userResponse.ID).To(Equal(1))
				Expect(userResponse.FirstName).To(Equal("peter"))
				Expect(userResponse.LastName).To(Equal("kneale"))
				Expect(userResponse.Name).To(Equal("peter kneale"))
			})
		})
		Context(`and not finding a record`, func() {
			BeforeEach(func() {
				userstore.GetFunc = func(id int) (*data.UserData, error) {
					return nil, nil
				}
			})
			It(`Should return status code for not found`, func() {
				Expect(statuscode).To(Equal(http.StatusNotFound))
			})
		})
		Context(`and returning an error`, func() {
			BeforeEach(func() {
				userstore.GetFunc = func(id int) (*data.UserData, error) {
					return nil, errors.New("mock error")
				}
			})
			It(`Should return internal error`, func() {
				Expect(statuscode).To(Equal(http.StatusInternalServerError))
			})
		})
	})

	Describe(`With an invalid input`, func() {
		Context(`containing an empty id`, func() {
			BeforeEach(func() {
				id = ""
			})
			It(`Should return status code for not found`, func() {
				Expect(statuscode).To(Equal(http.StatusNotFound))
			})
		})
		Context(`containing an id of zero`, func() {
			BeforeEach(func() {
				id = "0"
			})
			It(`Should return status code for bad request`, func() {
				Expect(statuscode).To(Equal(http.StatusBadRequest))
			})
		})
	})
})
