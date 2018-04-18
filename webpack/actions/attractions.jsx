import * as t from 'actions/actionTypes'
import { fetchJSON } from 'utils'
import { attractionPath, attractionsPath } from 'paths/api'

export function getAttraction(id) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ATTRACTION})
    fetchJSON(attractionPath(id))
    .then( payload =>
      dispatch({type: t.FETCHED_ATTRACTION, payload })
    )
  }
}

export function getAttractions() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ATTRACTIONS, payload: true})
    fetchJSON(attractionsPath())
    .then(payload => {
      dispatch({type: t.FETCHED_ATTRACTIONS, payload: payload})
    })
  }
}
