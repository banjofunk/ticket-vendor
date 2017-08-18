import * as t from '../actionTypes'

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

export function getCartItems(cartIds) {
  return function(dispatch) {
    fetch(`/api/promotions/get_promos?ids=${cartIds}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.CHECKOUT_PROMOTIONS_LOADED, payload: payload.promotions})
    })
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

export function checkoutCookieReset() {
  return function(dispatch) {
    dispatch({type: t.CHECKOUT_COOKIE_RESET, payload: true})
  }
}

export function updateCart(cart) {
  return function(dispatch) {
    dispatch({type: t.UPDATE_CART_QTY, payload: cart})
  }
}

export function removeFromCart(ticketID) {
  return function(dispatch) {
    dispatch({type: t.REMOVE_FROM_CART, payload: ticketID})
  }
}

export function addToCart(ticketID) {
  return function(dispatch) {
    fetch(`/api/promotions/get_promos?ids=${ticketID}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ADD_TO_CART, payload: payload.promotions[0]})
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
