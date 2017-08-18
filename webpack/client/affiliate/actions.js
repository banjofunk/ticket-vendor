import * as t from '../actionTypes'

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_PAGE_LOADED, payload: payload})
    })
  }
}

export function getAffiliate(id) {
  return function(dispatch) {
    fetch(`/api/affiliates/${id}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_LOADED, payload: payload})
    })
  }
}

export function getPromotions(id) {
  return function(dispatch) {
    fetch(`/api/affiliates/${id}/promotions`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_PROMOTIONS_LOADED, payload: payload.promotions})
    })
  }
}
