import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import users from './users/reducer'

const store = createStore(
  combineReducers({
    users,
  }),
  applyMiddleware(thunk)
)

export default store
