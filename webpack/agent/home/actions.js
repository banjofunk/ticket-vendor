import * as t from '../actionTypes'

export function addToCart(ticketID) {
  return function(dispatch) {
    dispatch({type: t.ADD_TO_CART, payload: ticketID})
  }
}

export function checkoutCookieReset() {
  return function(dispatch) {
    dispatch({type: t.CHECKOUT_COOKIE_RESET, payload: true})
  }
}

export function getClientToken() {
  return function(dispatch) {
    fetch(`/api/payments/client_token`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.CLIENT_TOKEN_LOADED, payload: payload})
    })
  }
}

export function sendPayment(paymentData) {
  const cart = paymentData.cart.map(function(item){
    return item.id + ':' + item.qty
  }).join(',') || ''
  let payload = {
    nonce: paymentData.nonce || '',
    cart: cart,
    cartData: paymentData.cart,
    firstName: paymentData.firstName,
    lastName: paymentData.lastName,
    phone: paymentData.phone,
    email: paymentData.email,
    ticketId: paymentData.ticketId,
    agent: paymentData.agent,
    codes: paymentData.codes
  }
  let formData = new FormData()
  formData.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch('/api/payments/send_payment', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.CHECKOUT_COMPLETED, payload: payload.response})
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

export function clearRedemptionSelection() {
  return function(dispatch) {
    dispatch({ type: t.CLEAR_REDEMPTION_SELECTION, payload: [] })
  }
}

export function updateRedemption(data) {
  return function(dispatch) {
    dispatch({ type: t.UPDATE_REDEMPTION, payload: data })
  }
}

export function removeRedemption(data) {
  return function(dispatch) {
    dispatch({ type: t.REMOVE_REDEMPTION, payload: data })
  }
}

export function getPromotions() {
  return function(dispatch) {
    fetch('/api/promotions/agent', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.PROMOTIONS_LOADED, payload: payload.promotions})
    })
  }
}
