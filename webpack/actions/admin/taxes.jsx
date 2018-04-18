import * as t from 'actions/actionTypes'
import { fetchJSON } from 'utils'
import {
  adminTaxPath,
  adminTaxesPath,
  adminActivatePromotionTaxPath
} from 'paths/api'

export function clearTax() {
  return function(dispatch) {
    dispatch({type: t.CLEAR_ADMIN_TAX})
  }
}

export function createTax(tax) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminTaxesPath(), {
      method: 'POST',
      body: JSON.stringify({ tax })
    })
    .then(payload =>
      dispatch({type: t.CREATED_ADMIN_TAX, payload})
    )
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function deleteTax(tax) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminTaxPath(tax.id), {
      method: 'DELETE'
    })
    .then( payload =>
      dispatch({type: t.DELETED_ADMIN_TAX, payload })
    )
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function getTax(id) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ADMIN_TAX})
    fetchJSON(adminTaxPath(id))
    .then( payload =>
      dispatch({type: t.FETCHED_ADMIN_TAX, payload })
    )
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function getTaxes() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ADMIN_TAXES})
    fetchJSON(adminTaxesPath())
    .then( payload =>
      dispatch({type: t.FETCHED_ADMIN_TAXES, payload })
    )
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function togglePromotionTax(promotionId, taxId) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ADMIN_PROMOTION, payload: true})
    fetchJSON(adminActivatePromotionTaxPath(promotionId), {
      method: 'POST',
      body: JSON.stringify({ tax_id: taxId })
    })
    .then( payload => {
      dispatch({type: t.FETCHED_ADMIN_PROMOTION, payload })
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function updateTax(tax) {
  return function(dispatch) {
    dispatch({type: t.CLEAR_MESSAGES, payload: true})
    fetchJSON(adminTaxPath(tax.id), {
      method: 'PUT',
      body: JSON.stringify({ tax })
    })
    .then(payload => {
      dispatch({type: t.UPDATED_ADMIN_TAX, payload: payload})
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })
  }
}

export function updateTaxForm(field, value) {
  return function(dispatch){
    dispatch({type: t.UPDATE_TAX_FORM, payload: {field, value}})
  }
}
