import * as t from 'actions/actionTypes'

const initialState = {
  cart:{},
  fetching: false,
  fetched: false
}

export default function cart(
  state=initialState, action) {

    switch (action.type) {
      case t.FETCHING_CART:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.FETCHED_CART:
        return { ...state,
          cart: action.payload,
          fetching: false,
          fetched: true }
        break
      case t.UPDATED_CART:
        return { ...state,
          cart: action.payload,
          fetching: false,
          fetched: true }
        break
    }
    return state
}
