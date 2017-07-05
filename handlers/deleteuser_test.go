package handlers

import (
	"fmt"
	"net/http"
	"net/http/httptest"

	"errors"

	"github.com/gorilla/mux"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/simplicate/lynx/data"
)

var _ = Describe(`Delete User Handler`, func() {
	var (
		recorder *httptest.ResponseRecorder
		router   *mux.Router

		// deps
		userstore *data.UserStoreMock

		// inputs
		id string

		// result
		statuscode int
	)

	BeforeEach(func() {
		userstore = &data.UserStoreMock{}
		handler := NewDeleteUserHandler(userstore)

		router = mux.NewRouter()
		router.Handle("/api/users/{id}", handler).Methods("DELETE")
		recorder = httptest.NewRecorder()
	})

	JustBeforeEach(func() {
		request, _ := http.NewRequest("DELETE", fmt.Sprintf("/api/users/%s", id), nil)
		router.ServeHTTP(recorder, request)

		statuscode = recorder.Code
	})

	Describe("loading from data store", func() {
		Context(`and finding a record to delete`, func() {
			BeforeEach(func() {
				id = "1"
				userstore.DeleteFunc = func(id int) error {
					return nil
				}
			})
			It(`Should return status code OK`, func() {
				Expect(statuscode).To(Equal(http.StatusOK))
			})
		})
		Context(`and returning an error`, func() {
			BeforeEach(func() {
				userstore.DeleteFunc = func(id int) error {
					return errors.New("mock error")
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
