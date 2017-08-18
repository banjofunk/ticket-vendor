import * as t from '../actionTypes'

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.CONTACT_LOADED, payload: payload})
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
