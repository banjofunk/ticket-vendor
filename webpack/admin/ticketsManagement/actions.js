import * as t from '../actionTypes'

export function createTax(taxData){
  let payload = {
    tax_data: taxData
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch('/api/admin/taxes', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TAX_CREATED, payload: payload})
    })
  }
}

export function deleteInventory(id) {
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/reset_inventory`, {
      device: 'browser',
      credentials: 'include',
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_UPDATED, payload: payload})
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
      dispatch({type: t.TICKETS_MANAGEMENT_LOADED, payload: payload})
      dispatch({type: t.PAGE_BANNERS_LOADED, payload: payload.banners})
    })
  }
}

export function getTickets() {
  return function(dispatch) {
    fetch('/api/admin/promotions', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKETS_LOADED, payload: payload})
    })
  }
}

export function getAffiliates() {
  return function(dispatch) {
    fetch('/api/admin/affiliates', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_AFFILIATES_LOADED, payload: payload.affiliates})
    })
  }
}

export function getPromoImages() {
  return function(dispatch) {
    fetch('/api/admin/images/promotion_images', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_PROMO_IMAGES_LOADED, payload: payload.images})
    })
  }
}

export function updateMainText(text) {
  return function(dispatch) {
    dispatch({type: t.UPDATE_TICKETS_MAIN_TEXT, payload: text})
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
      dispatch({type: t.TICKETS_PAGE_SAVED, payload: payload})
      dispatch({type: t.TOGGLE_BANNER_EDIT, payload: true})
    })
  }
}

export function handleFileUpload(id, file) {
  let data = new FormData()
  data.append('file', file)
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/bulk_admissions`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_UPDATED, payload: payload})
    })
  }
}

export function handleBackgroundUpload(id, file) {
  let data = new FormData()
  data.append('file', file)
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/background_upload`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_UPDATED, payload: payload})
    })
  }
}

export function updateTicket(formValue){
  let payload = {
    formValue: formValue
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch(`/api/admin/promotions/${formValue['id']}`, {
      device: 'browser',
      credentials: 'include',
      method: 'PUT',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_UPDATED, payload: payload})
    })
  }
}

export function updateLayout(id, layout){
  let payload = {
    layout: layout
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/update_layout`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_UPDATED, payload: payload})
    })
  }
}

export function updateSymbology(id, symbology){
  let payload = {
    symbology: symbology
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/update_symbology`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_UPDATED, payload: payload})
    })
  }
}

export function createTicket(formValue){
  let payload = {
    formValue: formValue
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch('/api/admin/promotions', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_CREATED, payload: payload})
    })
  }
}

export function toggleActivateRedemption(id, redemption){
  let payload = {
    redemption:redemption
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/update_status`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_PROMOTION_ACTIVATED, payload: payload})
    })
  }
}

export function toggleActivatePromotion(id, active){
  let payload = {
    active:active
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/update_status`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_PROMOTION_ACTIVATED, payload: payload})
    })
  }
}

export function toggleActivateCallCenter(id, active){
  let payload = {
    callCenter:active
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${id}/update_status`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_PROMOTION_ACTIVATED, payload: payload})
    })
  }
}

export function toggleTax(ticketId, taxId, value){
  let payload = {
    promotion_id: ticketId,
    tax_id: taxId,
    value: value
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${ticketId}/update_taxes`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TICKET_PROMOTION_ACTIVATED, payload: payload})
    })
  }

}

export function promoUploadFinished(src) {
  let payload = {
    src: src,
    kind: 'promo'
  };
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch('/api/admin/upload/completed', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.PROMO_UPLOAD_FINISHED, payload: payload.images})
    })
  }
}
