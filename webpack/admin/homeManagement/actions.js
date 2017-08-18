import * as t from '../actionTypes'

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.HOME_MANAGEMENT_LOADED, payload: payload})
      dispatch({type: t.PAGE_BANNERS_LOADED, payload: payload.banners})
    })
  }
}

export function savePageContent(id, text, attractions, sponsors, banners) {
  let payload = {
    id: id,
    content: text,
    attractions: attractions,
    sponsors: sponsors,
    banners: banners
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch('/api/admin/pages/update_page', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.HOME_PAGE_SAVED, payload: payload})
      dispatch({type: t.TOGGLE_BANNER_EDIT, payload: true})
    })
  }
}

export function submitRedemption(data) {
  return function(dispatch) {
    dispatch({ type: t.SUBMIT_REDEMPTION, payload: data })
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

export function reorderPromotions(promotions){
  return function(dispatch) {
    dispatch({type: t.REORDER_PROMOTIONS, payload: promotions})
  }
}

export function reorderSponsors(sponsors){
  return function(dispatch) {
    dispatch({type: t.REORDER_SPONSORS, payload: sponsors})
  }
}

export function reorderAttractions(attractions){
  return function(dispatch) {
    dispatch({type: t.REORDER_ATTRACTIONS, payload: attractions})
  }
}

export function toggleSortPromotions(show){
  return function(dispatch) {
    dispatch({type: t.TOGGLE_SORT_PROMOTIONS, payload: show})
  }
}

export function toggleSortSponsors(show){
  return function(dispatch) {
    dispatch({type: t.TOGGLE_SORT_SPONSORS, payload: show})
  }
}

export function toggleSortAttractions(show){
  return function(dispatch) {
    dispatch({type: t.TOGGLE_SORT_ATTRACTIONS, payload: show})
  }
}
