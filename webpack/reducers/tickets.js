import * as t from 'actions/actionTypes'

const initialState = {
  tickets: null,
  fetching: false,
  fetched: false
}

export default function tickets(
  state=initialState, action) {

    switch (action.type) {
      case t.FETCHING_TICKETS:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.FETCHED_TICKETS:
        return { ...state,
          tickets: action.payload,
          fetching: false,
          fetched: true }
        break
      case t.UPDATED_TICKETS:
        return { ...state,
          tickets: action.payload,
          fetching: false,
          fetched: true }
        break
    }
    return state
}
