import * as ActionTypes from './actionTypes'
import uuid from 'uuid'

const initialState = {
    users: [],
    total: 0,
    loading: false,
    error: false,
}

const usersHandler = {
    [ActionTypes.FETCH_USERS_REQUEST](state) {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },
    [ActionTypes.FETCH_USERS_SUCCESS](state, { users }) {
        return {
            ...state,
            users: users.map(user => {
                return { ...user, key: uuid() }
            }),
            loading: false,
            error: false,
        }
    },
    [ActionTypes.FETCH_USERS_FAILURE](state) {
        return {
            ...state,
            loading: false,
            error: true,
        }
    },
    [ActionTypes.GET_TOTAL_REQUEST](state) {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },
    [ActionTypes.GET_TOTAL_SUCCESS](state, { total }) {
        return {
            ...state,
            total,
            loading: false,
            error: false,
        }
    },
    [ActionTypes.GET_TOTAL_FAILURE](state) {
        return {
            ...state,
            loading: false,
            error: true,
        }
    },
    [ActionTypes.ADD_NEW_USER_REQUEST](state) {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },
    [ActionTypes.ADD_NEW_USER_SUCCESS](state) {
        return {
            ...state,
            loading: false,
            error: false,
        }
    },
    [ActionTypes.ADD_NEW_USER_FAILURE](state) {
        return {
            ...state,
            loading: false,
            error: true,
        }
    },
    [ActionTypes.UPDATE_USER_REQUEST](state) {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },
    [ActionTypes.UPDATE_USER_SUCCESS](state) {
        return {
            ...state,
            loading: false,
            error: false,
        }
    },
    [ActionTypes.UPDATE_USER_FAILURE](state) {
        return {
            ...state,
            loading: false,
            error: true,
        }
    },
    [ActionTypes.DELETE_USER_REQUEST](state) {
        return {
            ...state,
            loading: true,
            error: false,
        }
    },
    [ActionTypes.DELETE_USER_SUCCESS](state) {
        return {
            ...state,
            loading: false,
            error: false,
        }
    },
    [ActionTypes.DELETE_USER_FAILURE](state) {
        return {
            ...state,
            loading: false,
            error: true,
        }
    },
}

export default (state = initialState, action) =>
    usersHandler[action.type] ? usersHandler[action.type](state, action) : state
