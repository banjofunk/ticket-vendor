import * as t from 'actions/actionTypes'

const initialState = {
  promotions: false,
  fetching: false,
  fetched: false
}

export default function promotions(
  state=initialState, action) {

    switch (action.type) {
      case t.DELETED_ADMIN_PROMOTION:
        const remainingPromotions = (state.promotions || []).filter( promotion => {
          return promotion.id !== action.payload.id
        })
        return { ...state, promotions: remainingPromotions }
        break
      case t.FETCHING_PROMOTIONS:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.PROMOTIONS_LOADED:
        return { ...state,
          promotions: action.payload,
          fetching: false,
          fetched: true }
        break
    }
    return state
}
