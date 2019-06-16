import axios from 'axios'
import * as ActionTypes from './actionTypes'

export const fetchUsers = () => async (dispatch, getState) => {
    dispatch({
        type: ActionTypes.FETCH_USERS_REQUEST,
    })

    const {
            users: { total },
        } = getState(),
        pageSize = total

    await axios
        .get(
            `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users`,
            {
                params: {
                    pageSize,
                },
            }
        )
        .then(res => {
            dispatch({
                type: ActionTypes.FETCH_USERS_SUCCESS,
                users: res.data,
            })
        })
        .catch(() => {
            dispatch({
                type: ActionTypes.FETCH_USERS_FAILURE,
            })
        })
}

export const getTotal = () => async dispatch => {
    dispatch({
        type: ActionTypes.GET_TOTAL_REQUEST,
    })

    await axios
        .get(
            `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users/count`
        )
        .then(res => {
            dispatch({
                type: ActionTypes.GET_TOTAL_SUCCESS,
                total: res.data,
            })
        })
        .catch(() => {
            dispatch({
                type: ActionTypes.GET_TOTAL_FAILURE,
            })
        })
}

export const updateUser = data => async dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_USER_REQUEST,
    })

    const { name, email, password, objectId } = data
    await axios
        .put(
            `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users/${objectId}`,
            {
                name,
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(() => {
            dispatch({
                type: ActionTypes.UPDATE_USER_SUCCESS,
            })
        })
        .catch(() => {
            dispatch({
                type: ActionTypes.UPDATE_USER_FAILURE,
            })
        })
}

export const addNewUser = userData => async dispatch => {
    dispatch({
        type: ActionTypes.ADD_NEW_USER_REQUEST,
    })

    await axios
        .post(
            `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users`,
            {
                ...userData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(() => {
            dispatch({
                type: ActionTypes.ADD_NEW_USER_SUCCESS,
            })
        })
        .catch(() => {
            dispatch({
                type: ActionTypes.ADD_NEW_USER_FAILURE,
            })
        })
}

export const deleteUser = id => async dispatch => {
    dispatch({
        type: ActionTypes.DELETE_USER_REQUEST,
    })

    await axios
        .delete(
            `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users/${id}`
        )
        .then(() => {
            dispatch({
                type: ActionTypes.DELETE_USER_SUCCESS,
            })
        })
        .catch(() => {
            dispatch({
                type: ActionTypes.DELETE_USER_FAILURE,
            })
        })
}
