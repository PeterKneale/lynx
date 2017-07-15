import {REQUEST_LIST_USERS, RESPONSE_LIST_USERS, REQUEST_LIST_USERS_FAIL} from "../actions"

const INITIAL_STATE = {
  users: [],
  total: 0
}
const usersReducer = (state = INITIAL_STATE, action) => {
  console.log("Users reducer. Action: " + JSON.stringify(action));
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
    default:
      return state
  }
}

export default usersReducer