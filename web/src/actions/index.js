import fetch from 'isomorphic-fetch'
import { hashHistory } from 'react-router'

const BASE_URL = '';

// LIST
export const REQUEST_LIST_USERS = 'REQUEST_LIST_USERS'
export const REQUEST_LIST_USERS_FAIL = 'REQUEST_LIST_USERS_FAIL'
export const RESPONSE_LIST_USERS = 'RESPONSE_LIST_USERS'

export const requestListUsers = () => ({
  type: REQUEST_LIST_USERS
})
export const requestListUsersFail = (message) => ({
  type: REQUEST_LIST_USERS_FAIL,
  message: message
})
export const responseListUsers = (json) => ({
  type: RESPONSE_LIST_USERS,
  users: json.users,
  total: json.total
})

export function listUsers() {
  return (dispatch, getState) => {
    return dispatch(doListUsers())
  }
}

function doListUsers() {
  return (dispatch) => {
    dispatch(requestListUsers())
    return fetch(BASE_URL + '/api/users')
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(responseListUsers(json)))
      .catch(e => dispatch(requestListUsersFail("Unable to list users." + e)));
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}