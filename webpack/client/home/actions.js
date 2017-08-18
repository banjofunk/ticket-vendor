import * as t from '../actionTypes'

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.HOME_PAGE_LOADED, payload: payload})
    })
  }
}

export function submitRedemption(code) {
  return function(dispatch) {
    fetch(`/api/redemption_codes/${code}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({ type: t.SUBMIT_REDEMPTION, payload: payload })
    })
  }
}

export function selectRedemption(redemption) {
  return function(dispatch) {
    dispatch({ type: t.SUBMIT_REDEMPTION, payload: [redemption] })
  }
}

export function updateRedemption(data) {
  return function(dispatch) {
    dispatch({ type: t.UPDATE_REDEMPTION, payload: data })
  }
}

export function getPromotions() {
  return function(dispatch) {
    fetch('/api/promotions', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.PROMOTIONS_LOADED, payload: payload.promotions})
    })
  }
}

export function getSponsors() {
  return function(dispatch) {
    fetch('/api/affiliates?category=sponsors', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.SPONSORS_LOADED, payload: payload.affiliates})
    })
  }
}

export function getAttractions() {
  return function(dispatch) {
    fetch('/api/affiliates?category=attractions', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ATTRACTIONS_LOADED, payload: payload.affiliates})
    })
  }
}
