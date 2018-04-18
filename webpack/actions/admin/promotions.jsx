import * as t from 'actions/actionTypes'
import { fetchJSON } from 'utils'
import {
  adminPromotionPath,
  adminPromotionAdmissionsPath
} from 'paths/api'

export function clearPromotion() {
  return function(dispatch) {
    dispatch({type: t.CLEAR_ADMIN_PROMOTION})
  }
}

export function createPromotion(promotion) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminPromotionPath(promotion.id), {
      method: 'POST',
      body: JSON.stringify({ promotion })
    })
    .then(payload => {
      dispatch({type: t.CREATED_ADMIN_PROMOTION, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function deleteAdmissions(promotion) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminPromotionAdmissionsPath(promotion.id), {
      method: 'DELETE'
    })
    .then( payload => {
      dispatch({type: t.DELETED_ADMIN_ADMISSIONS, payload })
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function deletePromotion(promotion) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminPromotionPath(promotion.id), {
      method: 'DELETE'
    })
    .then( payload => {
      dispatch({type: t.DELETED_ADMIN_PROMOTION, payload })
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function exportedInventory() {
  return function(dispatch) {
    dispatch({type: t.EXPORTED_ADMIN_ADMISSIONS, payload: true})
  }
}

export function getPromotion(id) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ADMIN_PROMOTION})
    fetchJSON(adminPromotionPath(id))
    .then( payload =>
      dispatch({type: t.FETCHED_ADMIN_PROMOTION, payload })
    )
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function importAdmissions(promotion, file) {
  let data = new FormData()
  data.append('file', file)
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetch(adminPromotionAdmissionsPath(promotion.id), {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.UPLOADED_ADMIN_ADMISSIONS, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function updatePromotion(promotion) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ADMIN_PROMOTION, payload: true})
    fetchJSON(adminPromotionPath(promotion.id), {
      method: 'PUT',
      body: JSON.stringify({ promotion })
    })
    .then(payload => {
      dispatch({type: t.FETCHED_ADMIN_PROMOTION, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function updatePromotionForm(field, value) {
  return function(dispatch){
    dispatch({type: t.UPDATE_PROMOTION_FORM, payload: {field, value}})
  }
}
