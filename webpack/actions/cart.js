import * as t from 'actions/actionTypes'
import { promotionsPath } from 'paths/api'
import Cookies from 'universal-cookie'

export function getCart() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_CART, payload })
    const cookies = new Cookies()
    const payload = cookies.get('cart') || {}
    dispatch({type: t.FETCHED_CART, payload })
  }
}

export function updateCartQty(item, qty) {
  return function(dispatch) {
    const cookies = new Cookies()
    const cart = cookies.get('cart') || {}
    if( cart[item] >= 0 ){
      cart[item] = parseInt(qty || 0)
    }
    cookies.set('cart', cart, { path: '/' })
    const payload = cookies.get('cart')
    dispatch({type: t.UPDATED_CART, payload })
  }
}

export function addToCart(item) {
  return function(dispatch) {
    const cookies = new Cookies()
    const cart = cookies.get('cart') || {}
    cart[item] = (cart[item] || 0) + 1
    cookies.set('cart', cart, { path: '/' })
    const payload = cookies.get('cart')
    dispatch({type: t.UPDATED_CART, payload })
  }
}

export function removeFromCart(item) {
  return function(dispatch) {
    const cookies = new Cookies()
    const cart = cookies.get('cart') || {}
    if( cart[item] > 0 ){
      cart[item] = (cart[item] || 0) - 1
    }
    cookies.set('cart', cart, { path: '/' })
    const payload = cookies.get('cart')
    dispatch({type: t.UPDATED_CART, payload })
  }
}

export function deleteFromCart(item) {
  return function(dispatch) {
    const cookies = new Cookies()
    const cart = cookies.get('cart') || {}
    delete cart[item]
    cookies.set('cart', cart, { path: '/' })
    const payload = cookies.get('cart')
    dispatch({type: t.UPDATED_CART, payload })
  }
}

export function clearCart(item) {
  return function(dispatch) {
    const cookies = new Cookies()
    cookies.set('cart', {}, { path: '/' })
    const payload = cookies.get('cart')
    dispatch({type: t.UPDATED_CART, payload })
  }
}
