import * as t from 'actions/actionTypes'
import { fetchJSON } from 'utils'
import { promotionsPath } from 'paths/api'

export function getPromotions() {
  return function(dispatch) {
    fetchJSON(promotionsPath())
    .then( payload =>
      dispatch({type: t.PROMOTIONS_LOADED, payload })
    )
  }
}
