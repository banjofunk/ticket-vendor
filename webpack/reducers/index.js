import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'

import promotionReducer from './promotionReducer'
import attractionReducer from './attractionReducer'

const middleware = applyMiddleware(promise(), thunk)
const reducer = combineReducers({
  promotionReducer,
  attractionReducer
})

export default reducer
