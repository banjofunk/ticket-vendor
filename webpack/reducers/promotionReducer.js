import * as t from 'actionTypes'

const initialState = {
  promotions:[],
  isFetching: false,
  isFetched: false
}

export default function promotionReducer(
  state=initialState, action) {

    switch (action.type) {
      case t.FETCHING_PROMOTIONS:
        return { ...state,
          isFetching: true,
          isFetched: false }
        break
      case t.PROMOTIONS_LOADED:
        return { ...state,
          promotions: action.payload.promotions,
          isFetching: false,
          isFetched: true }
        break
    }
    return state
}
