import { combineReducers } from 'redux'
import usersReducer from './users'

const rootReducer = combineReducers({
  usersReducer: usersReducer
})

export default rootReducer