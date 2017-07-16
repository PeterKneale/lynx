package handlers

import (
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

var _ = Describe(`Get Users Handler`, func() {
	var (
		recorder *httptest.ResponseRecorder
		router   *mux.Router

		// deps
		userstore *data.UserStoreMock

		// result
		statuscode int
		response   *UsersResponse
	)

	BeforeEach(func() {
		userstore = &data.UserStoreMock{}
		handler := NewGetUsersHandler(userstore)

		router = mux.NewRouter()
		router.Handle("/api/users", handler).Methods("GET")
		recorder = httptest.NewRecorder()
	})

	JustBeforeEach(func() {
		request, _ := http.NewRequest("GET", "/api/users", nil)
		router.ServeHTTP(recorder, request)

		statuscode = recorder.Code
		b, _ := ioutil.ReadAll(recorder.Body)
		json.Unmarshal(b, &response)
	})

	Describe("loading from data store", func() {
		Context(`and finding many records`, func() {
			BeforeEach(func() {
				userstore.ListFunc = func(p *data.PagedQuery) ([]*data.UserData, error) {
					return []*data.UserData{
						&data.UserData{ID: 1, FirstName: "TestUser1FirstName", LastName: "TestUser1FirstName"},
						&data.UserData{ID: 2, FirstName: "TestUser2FirstName", LastName: "TestUser2FirstName"},
						&data.UserData{ID: 3, FirstName: "TestUser3FirstName", LastName: "TestUser3FirstName"},
					}, nil
				}
				userstore.CountFunc = func() (int, error) {
					return 3, nil
				}
			})
			It(`Should return status code OK`, func() {
				Expect(statuscode).To(Equal(http.StatusOK))
			})
			It(`Should return response containing the right nummber of users`, func() {
				Expect(len(response.Users)).To(Equal(3))
			})
		})
		Context(`and not finding a record`, func() {
			BeforeEach(func() {
				userstore.ListFunc = func(p *data.PagedQuery) ([]*data.UserData, error) {
					return nil, nil
				}
				userstore.CountFunc = func() (int, error) {
					return 0, nil
				}
			})
			It(`Should return status code for found`, func() {
				Expect(statuscode).To(Equal(http.StatusOK))
			})
			It(`Should return response containing no users`, func() {
				Expect(len(response.Users)).To(Equal(0))
			})
		})
		Context(`and returning an error on list`, func() {
			BeforeEach(func() {
				userstore.ListFunc = func(p *data.PagedQuery) ([]*data.UserData, error) {
					return nil, errors.New("mock error")
				}
			})
			It(`Should return internal error`, func() {
				Expect(statuscode).To(Equal(http.StatusInternalServerError))
			})
		})
		Context(`and returning an error on count`, func() {
			BeforeEach(func() {
				userstore.ListFunc = func(p *data.PagedQuery) ([]*data.UserData, error) {
					return nil, nil
				}
				userstore.CountFunc = func() (int, error) {
					return 0, errors.New("mock error")
				}
			})
			It(`Should return internal error`, func() {
				Expect(statuscode).To(Equal(http.StatusInternalServerError))
			})
		})
	})
})
