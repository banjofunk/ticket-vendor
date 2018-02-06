import * as t from 'actionTypes'
import { fetchJSON } from 'utils'
import { promotionsPath } from 'utils/apiPaths'

export function getPromotions() {
  return function(dispatch) {
    fetchJSON(promotionsPath())
    .then( payload =>
      dispatch({type: t.PROMOTIONS_LOADED, payload })
    )
  }
}
