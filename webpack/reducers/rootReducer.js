import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'

import admin from './admin/rootReducer'
import attraction from './attraction'
import attractions from './attractions'
import auth from './auth'
import cart from './cart'
import message from './message'
import promotions from './promotions'
import tickets from './tickets'

const middleware = applyMiddleware(promise(), thunk)
const reducer = combineReducers({
  admin,
  attraction,
  attractions,
  auth,
  cart,
  message,
  promotions,
  tickets
})

export default reducer
