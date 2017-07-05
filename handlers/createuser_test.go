package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"

	"errors"

	"github.com/gorilla/mux"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/simplicate/lynx/data"
)

var _ = Describe(`Create User Handler`, func() {
	var (
		recorder *httptest.ResponseRecorder
		router   *mux.Router

		// deps
		userstore *data.UserStoreMock

		// inputs
		firstname string
		lastname  string

		// result
		statuscode int
		location   string
		response   *UserResponse
	)

	BeforeEach(func() {
		userstore = &data.UserStoreMock{}
		handler := NewCreateUserHandler(userstore)

		router = mux.NewRouter()
		router.Handle("/api/users", handler).Methods("POST")
		recorder = httptest.NewRecorder()
	})

	JustBeforeEach(func() {
		values := map[string]string{"firstname": firstname, "lastname": lastname}
		jsonValue, _ := json.Marshal(values)
		request, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(jsonValue))
		router.ServeHTTP(recorder, request)

		statuscode = recorder.Code
		location = recorder.HeaderMap.Get("Location")
		b, _ := ioutil.ReadAll(recorder.Body)
		json.Unmarshal(b, &response)
	})

	Describe("creating in the data store", func() {
		Context(`and inserting successfully`, func() {
			BeforeEach(func() {
				firstname = "user"
				lastname = "one"
				userstore.CreateFunc = func(user *data.UserData) error {
					user.ID = 1
					return nil
				}
			})
			It(`Should return status code CREATED`, func() {
				Expect(statuscode).To(Equal(http.StatusCreated))
			})
			It(`Should return header Location containing`, func() {
				Expect(location).To(Equal("/api/users/1"))
			})
			It(`Should return header Location containing`, func() {
				Expect(response.ID).To(Equal(1))
				Expect(response.FirstName).To(Equal("user"))
				Expect(response.LastName).To(Equal("one"))
				Expect(response.Name).To(Equal("user one"))
			})
		})
		Context(`and returning an error`, func() {
			BeforeEach(func() {
				userstore.CreateFunc = func(user *data.UserData) error {
					return errors.New("mock error")
				}
			})
			It(`Should return internal error`, func() {
				Expect(statuscode).To(Equal(http.StatusInternalServerError))
			})
		})
	})

	Describe(`With an invalid input`, func() {
		Context(`containing an empty firstname`, func() {
			BeforeEach(func() {
				firstname = ""
				lastname = "test"
			})
			It(`Should return status code for bad request`, func() {
				Expect(statuscode).To(Equal(http.StatusBadRequest))
			})
		})
		Context(`containing an empty lastname`, func() {
			BeforeEach(func() {
				firstname = "test"
				lastname = ""
			})
			It(`Should return status code for bad request`, func() {
				Expect(statuscode).To(Equal(http.StatusBadRequest))
			})
		})
	})
})
