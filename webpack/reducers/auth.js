import * as t from 'actions/actionTypes'

const initialState = {
  user: null,
  error: null,
  fetching: false,
  fetched: false
}

export default function auth(
  state=initialState, action) {

    switch (action.type) {
      case t.FETCHING_AUTH:
        return { ...state, fetching: true }
        break
      case t.FETCHED_AUTH:
        return { ...state,
          user: action.payload,
          fetching: false,
          fetched: true }
        break
      case t.USER_LOGIN:
        return { ...state,
          user: action.payload,
          fetching: false,
          fetched: true }
        break
      case t.USER_LOGOUT:
        return initialState
        break
    }
    return state
}
