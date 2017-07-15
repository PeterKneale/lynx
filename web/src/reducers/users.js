import {initialState, REQUEST_LIST_USERS,RESPONSE_LIST_USERS} from "../actions"

const users = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LIST_USERS:
      return {
        ...state
      }
    case RESPONSE_LIST_USERS:
      return {
        ...state,
        users: action.users.map((user) => { return { ...user } })
      }
    default:
      return state
  }
}

export default users