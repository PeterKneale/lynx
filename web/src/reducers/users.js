import {REQUEST_LIST_USERS, RESPONSE_LIST_USERS, REQUEST_LIST_USERS_FAIL} from "../actions"
import {REQUEST_DELETE_USER, RESPONSE_DELETE_USER, REQUEST_DELETE_USER_FAIL} from "../actions"

const INITIAL_STATE = {
  users: [],
  total: 0
}
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_LIST_USERS:
      return {
        ...state
      }
    case RESPONSE_LIST_USERS:
      return {
        ...state,
        users: action.users,
        total: action.total
      }
    case REQUEST_LIST_USERS_FAIL:
      return {
        ...state
      }
    case REQUEST_DELETE_USER:
        return { 
            ...state, 
            users : state.users
        }
    case RESPONSE_DELETE_USER:
        return { 
            ...state, 
            users : state.users.filter(function(user) { return user.id !== action.id } ) 
        }
    default:
      return state
  }
}

export default usersReducer