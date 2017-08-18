import * as t from '../actionTypes'

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.CONTACT_MANAGEMENT_LOADED, payload: payload})
      dispatch({type: t.PAGE_BANNERS_LOADED, payload: payload.banners})
    })
  }
}

export function updateMainText(text) {
  return function(dispatch) {
    dispatch({type: t.UPDATE_CONTACT_MAIN_TEXT, payload: text})
  }
}

export function savePageContent(id, text, banners) {
  let payload = {
    id: id,
    content: text,
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
      dispatch({type: t.CONTACT_PAGE_SAVED, payload: payload})
      dispatch({type: t.TOGGLE_BANNER_EDIT, payload: true})
    })
  }
}

export function sendContactForm(formValue){
  let payload = {
    formValue: formValue
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch('/api/pages/send_contact_form', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.CONTACT_FORM_SENT, payload: payload})
    })
  }
}
