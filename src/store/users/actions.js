import axios from 'axios'
import * as ActionTypes from './actionTypes'

export const fetchUsers = (pageNum = 0, search) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ActionTypes.FETCH_USERS_REQUEST,
  })

  const {
    users: { pageSize },
  } = getState()
  const offset = pageNum <= 1 ? 0 : pageSize * (pageNum - 1)
  const where = search
    ? search.name
      ? `name LIKE '%${search.phrase}%'`
      : `email LIKE '%${search.phrase}%'`
    : null

  return axios
    .get(
      `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users`,
      {
        params: {
          pageSize,
          offset,
          where,
        },
      }
    )
    .then(res => {
      dispatch({
        type: ActionTypes.FETCH_USERS_SUCCESS,
        users: res.data,
      })
      if (search) {
        dispatch({
          type: ActionTypes.GET_TOTAL_SUCCESS,
          total: res.data.length,
        })
      }
      return true
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.FETCH_USERS_FAILURE,
      })
      return false
    })
}

export const getTotal = () => async dispatch => {
  dispatch({
    type: ActionTypes.GET_TOTAL_REQUEST,
  })

  return axios
    .get(
      `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users/count`
    )
    .then(res => {
      dispatch({
        type: ActionTypes.GET_TOTAL_SUCCESS,
        total: res.data,
      })
      return true
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.GET_TOTAL_FAILURE,
      })
      return false
    })
}

export const updateUser = data => async dispatch => {
  dispatch({
    type: ActionTypes.UPDATE_USER_REQUEST,
  })

  const { name, email, password, objectId } = data
  return axios
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
      return true
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.UPDATE_USER_FAILURE,
      })
      return false
    })
}

export const addNewUser = userData => async dispatch => {
  dispatch({
    type: ActionTypes.ADD_NEW_USER_REQUEST,
  })

  return axios
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
      return true
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.ADD_NEW_USER_FAILURE,
      })
      return false
    })
}

export const deleteUser = id => async dispatch => {
  dispatch({
    type: ActionTypes.DELETE_USER_REQUEST,
  })

  return axios
    .delete(
      `https://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users/${id}`
    )
    .then(() => {
      dispatch({
        type: ActionTypes.DELETE_USER_SUCCESS,
      })
      return true
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.DELETE_USER_FAILURE,
      })
      return false
    })
}
