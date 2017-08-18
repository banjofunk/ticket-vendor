import * as t from '../actionTypes'

export function getAffiliates() {
  return function(dispatch) {
    fetch('/api/admin/affiliates', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATES_LOADED, payload: payload.affiliates})
    })
  }
}

export function affiliateChecked(affiliateID, checked, category){
  let payload = {
    checked:checked,
    category:category
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch(`/api/admin/affiliates/${affiliateID}/update_category`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_CHECKED, payload: payload})
    })
  }
}


export function deleteRedemptions(id) {
  return function(dispatch) {
    fetch(`/api/admin/affiliates/${id}/reset_redemptions`, {
      device: 'browser',
      credentials: 'include',
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_UPDATED, payload: payload})
    })
  }
}

export function showAffiliate(id){
  return function(dispatch){
    dispatch({type: t.SHOW_AFFILIATE, payload: id})
  }
}

export function toggleActivateAffiliate(id, active){
  let payload = {
    active:active
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch(`/api/admin/affiliates/${id}/update_status`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_CHECKED, payload: payload})
    })
  }
}

export function hideEdit(){
  return function(dispatch){
    dispatch({type: t.HIDE_EDIT, payload: true})
  }
}

export function getPromotions(id) {
  return function(dispatch) {
    fetch(`/api/admin/affiliates/${id}/promotions`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_PROMOTIONS_LOADED, payload: payload.promotions})
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
      dispatch({type: t.AFFILIATE_PROMOTION_CREATED, payload: payload})
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
      dispatch({type: t.AFFILIATE_PROMOTION_UPDATED, payload: payload})
    })
  }
}

export function createAffiliate(formValue){
  let payload = {
    formValue: formValue
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch('/api/admin/affiliates', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_CREATED, payload: payload})
    })
  }
}

export function updateAffiliate(formValue){
  let payload = {
    formValue: formValue
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/affiliates/${formValue['id']}`, {
      device: 'browser',
      credentials: 'include',
      method: 'PUT',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_UPDATED, payload: payload})
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
      dispatch({type: t.AFFILIATE_PROMO_IMAGES_LOADED, payload: payload.images})
    })
  }
}

export function getLogos() {
  return function(dispatch) {
    fetch('/api/admin/images/logo_images', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_LOGO_IMAGES_LOADED, payload: payload.images})
    })
  }
}

export function toggleActivatePromotion(vars){
  let payload = {
    active:vars.active
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/promotions/${vars.id}/update_status`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_PROMOTION_ACTIVATED, payload: payload})
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
      dispatch({type: t.AFFILIATE_PROMO_UPLOAD_FINISHED, payload: payload.images})
    })
  }
}

export function logoUploadFinished(src) {
  let payload = {
    src: src,
    kind: 'logo'
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
      dispatch({type: t.AFFILIATE_LOGO_UPLOAD_FINISHED, payload: payload.images})
    })
  }
}



export function handleFileUpload(id, file) {
  let data = new FormData()
  data.append('file', file)
  return function(dispatch) {
    fetch(`/api/admin/affiliates/${id}/bulk_redemptions`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AFFILIATE_UPDATED, payload: payload})
    })
  }
}
