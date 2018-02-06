import * as t from 'actionTypes'

export function getAttractions() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_ATTRACTIONS, payload: true})
    fetch('/api/v1/attractions?category=attractions', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ATTRACTIONS_LOADED, payload: payload})
    })
  }
}

export function getAttraction(id) {
  return function(dispatch) {
    fetch(`/api/attractions/${id}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ATTRACTION_LOADED, payload: payload})
    })
  }
}

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ATTRACTION_PAGE_LOADED, payload: payload})
    })
  }
}

export function getPromotions(id) {
  return function(dispatch) {
    fetch(`/api/attractions/${id}/promotions`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ATTRACTION_PROMOTIONS_LOADED, payload: payload.promotions})
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


export function getSponsors() {
  return function(dispatch) {
    fetch('/api/attractions?category=sponsors', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.SPONSORS_LOADED, payload: payload.attractions})
    })
  }
}
