import { REQUEST_LIST_USERS,RESPONSE_LIST_USERS, REQUEST_LIST_USERS_FAIL} from "../actions"

const INITIAL_STATE={
  users:[],
  total:0
}
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_LIST_USERS:
      console.log("REQUEST_LIST_USERS in reducer")
      return {
        ...state
      }
    case RESPONSE_LIST_USERS:
      console.log("RESPONSE_LIST_USERS in reducer, Action: " + JSON.stringify(action))
      return {
        ...state,
        users: action.users,
        total: action.total
      }
    case REQUEST_LIST_USERS_FAIL:
      console.log("REQUEST_LIST_USERS_FAIL in reducer")
      console.log(action.message)
      return {
        ...state
      }
    default:
      return state
  }
}

export default usersReducer