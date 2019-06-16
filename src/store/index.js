import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import users from './users/reducer'

export const store = createStore(
    combineReducers({
        users,
    }),
    applyMiddleware(thunk)
)
