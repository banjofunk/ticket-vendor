import * as t from 'actions/actionTypes'
import { fetchJSON } from 'utils'
import {
  adminAttractionPath,
  adminAttractionsPath
} from 'paths/api'

export function clearAttraction() {
  return function(dispatch) {
    dispatch({type: t.CLEAR_ADMIN_ATTRACTION})
  }
}

export function createAttraction(attraction) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminAttractionsPath(), {
      method: 'POST',
      body: JSON.stringify({ attraction })
    })
    .then(payload => {
      dispatch({type: t.CREATED_ADMIN_ATTRACTION, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function deleteAttraction(attraction) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminAttractionPath(attraction.id), {
      method: 'DELETE'
    })
    .then( payload => {
      dispatch({type: t.DELETED_ADMIN_ATTRACTION, payload })
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function getAttraction(id) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ATTRACTION})
    fetchJSON(adminAttractionPath(id))
    .then( payload =>
      dispatch({type: t.FETCHED_ATTRACTION, payload })
    )
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function getAttractions() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ADMIN_ATTRACTIONS, payload: true})
    fetchJSON(adminAttractionsPath())
    .then(payload => {
      dispatch({type: t.FETCHED_ADMIN_ATTRACTIONS, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function updateAttraction(attraction) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ATTRACTION, payload: true})
    fetchJSON(adminAttractionPath(attraction.id), {
      method: 'PUT',
      body: JSON.stringify({ attraction })
    })
    .then(payload => {
      dispatch({type: t.FETCHED_ATTRACTION, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })

  }
}

export function updateAttractionForm(field, value) {
  return function(dispatch){
    dispatch({type: t.UPDATE_ATTRACTION_FORM, payload: {field, value}})
  }
}
