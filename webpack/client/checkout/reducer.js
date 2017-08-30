import * as t from '../actionTypes'
import cookie from 'react-cookie'
import { Cookies } from 'react-cookie'


const initialState = {
  promotions: [],
  cookies: new Cookies(),
  cart: [],
  promotionsLoaded:false,
  btResponse:{},
  clientToken:"",
  clearCookie:false
}

export default function reducer(
  state=initialState, action) {
    const cookies = new Cookies()
    state.cart = cookies.get('cartCookie') || []

    switch (action.type) {
      case t.CLIENT_TOKEN_LOADED: {
        return {...state, clientToken: action.payload.token}
      }
      case t.CHECKOUT_PROMOTIONS_LOADED: {
        return {...state, promotionsLoaded:true, promotions: action.payload}
      }
      case t.CHECKOUT_COMPLETED: {
        let newState = {...state}
        newState.btResponse = action.payload
        if(action.payload.success){
          newState.promotions = []
          newState.clearCookie = true
        }
        return newState
      }
      case t.CHECKOUT_COOKIE_RESET: {
        return {...state, clearCookie:false}
      }
      case t.ADD_TO_CART: {
        let promotions = [...state.promotions]
        promotions.push(action.payload)
        promotions = promotions.filter((v, i, a) => a.indexOf(v) === i)


        let cart = [...state.cart]
        let result = cart.filter(function( obj ) {
          return obj.id == action.payload.id;
        })[0]
        if(result){
          const resultIdx = cart.indexOf(result)
          cart[resultIdx].qty += 1
        }else{
          cart.unshift({id:action.payload.id, qty:1})
        }
        cookies.set('cartCookie', cart, { path: '/' })
        return {...state, cart, promotions}
      }
      case t.UPDATE_CART_QTY: {
        const cart = action.payload
        cookies.set('cartCookie', cart, { path: '/' })
        return {...state, cart}
      }
      case t.REMOVE_FROM_CART: {
        let promotions = []
        for (var i = 0; i < state.promotions.length; i++) {
          const promotion = state.promotions[i]
          if(promotion.id != action.payload){
            promotions.push(promotion)
          }
        }
        let cart = []
        for (var i = 0; i < state.cart.length; i++) {
          const promotion = state.cart[i]
          if(promotion.id != action.payload){
            cart.push(promotion)
          }
        }
        cookies.set('cartCookie', cart, { path: '/' })
        return {...state, promotions, cart}
      }
      case t.PROMOTIONS_LOADED: {
        let promotions = []
        for (var i = 0; i < action.payload.length; i++) {
          promotions.push(action.payload[i])
        }
        return { ...state, promotions }
      }
    }
    return state
}
