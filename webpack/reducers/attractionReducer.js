import * as t from 'actionTypes'

const initialState = {
  attractions: [],
  fetching: false,
  fetched: false
}

export default function attractionReducer(
  state=initialState, action) {
    switch (action.type) {
      case t.FETCHING_ATTRACTIONS:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.ATTRACTIONS_LOADED:
        return { ...state,
          attractions: action.payload,
          fetching: false,
          fetched: true }
        break
    }
    return state
}
