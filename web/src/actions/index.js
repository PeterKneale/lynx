import fetch from 'isomorphic-fetch'

const BASE_URL = '';
// GET
export const REQUEST_GET_USER = 'REQUEST_GET_USER'
export const REQUEST_GET_USER_FAIL = 'REQUEST_GET_USER_FAIL'
export const RESPONSE_GET_USER = 'RESPONSE_GET_USER'
export const requestGetUser = (id) => ({ type: REQUEST_GET_USER, id: id })
export const requestGetUserFail = (message) => ({ type: REQUEST_GET_USER_FAIL, message: message })
export const responseGetUser = (json) => ({ type: RESPONSE_GET_USER, user: json})

// LIST
export const REQUEST_LIST_USERS = 'REQUEST_LIST_USERS'
export const REQUEST_LIST_USERS_FAIL = 'REQUEST_LIST_USERS_FAIL'
export const RESPONSE_LIST_USERS = 'RESPONSE_LIST_USERS'
export const requestListUsers = () => ({ type: REQUEST_LIST_USERS })
export const requestListUsersFail = (message) => ({ type: REQUEST_LIST_USERS_FAIL, message: message })
export const responseListUsers = (json) => ({ type: RESPONSE_LIST_USERS, users: json.users, total: json.total })

// UPDATE
export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER'
export const REQUEST_UPDATE_USER_FAIL = 'REQUEST_UPDATE_USER_FAIL'
export const RESPONSE_UPDATE_USER = 'RESPONSE_UPDATE_USER'
export const requestUpdateUser = (id, first_name, last_name) => ({ type: REQUEST_UPDATE_USER, id: id, first_name: first_name, last_name: last_name })
export const requestUpdateUserFail = (message) => ({ type: REQUEST_UPDATE_USER_FAIL, message: message })
export const responseUpdateUser = (id) => ({ type: RESPONSE_UPDATE_USER, id: id })

// DELETE
export const REQUEST_DELETE_USER = 'REQUEST_DELETE_USER'
export const REQUEST_DELETE_USER_FAIL = 'REQUEST_DELETE_USER_FAIL'
export const RESPONSE_DELETE_USER = 'RESPONSE_DELETE_USER'
export const requestDeleteUser = (id) => ({ type: REQUEST_DELETE_USER, id: id })
export const requestDeleteUserFail = (message) => ({ type: REQUEST_DELETE_USER_FAIL, message: message })
export const responseDeleteUser = (id) => ({ type: RESPONSE_DELETE_USER, id: id })

// exported functions
export function listUsers() { return (dispatch, getState) => { return dispatch(doListUsers()) } }
export function updateUser(id) { return (dispatch, getState) => { return dispatch(doUpdateUser()) } }
export function deleteUser(id) { return (dispatch, getState) => { return dispatch(doDeleteUser()) } }


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
function doGetUser(id) {
    return (dispatch) => {
        dispatch(requestGetUser(id))
        return fetch(BASE_URL + '/api/users' + id)
            .then(checkStatus)
            .then(response => response.json())
            .then(json => dispatch(responseGetUser(json)))
            .catch(e => dispatch(requestGetUserFail("Unable to get user.")));
    }
}
function doUpdateUser(id, first_name, last_name) {
    return (dispatch) => {
        dispatch(requestUpdateUser())
        return fetch(BASE_URL + '/api/users/' + id, {method:'put', body: JSON.stringify({first_name:first_name, last_name: last_name})})
            .then(checkStatus)
            .then(response => {
                dispatch(responseUpdateUser(id))
                //navigate('/users/view/'+ id)
            })
            .catch(e => dispatch(requestUpdateUserFail("Unable to update user.", e)));
    }
}
function doDeleteUser(id) {
    return (dispatch) => {
        dispatch(requestDeleteUser(id))
        return fetch(BASE_URL + '/api/users/' + id, {method:'delete'})
            .then(checkStatus)
            .then(dispatch(responseDeleteUser(id)))
            .catch(e => dispatch(requestDeleteUserFail("Unable to delete user." + e)));
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