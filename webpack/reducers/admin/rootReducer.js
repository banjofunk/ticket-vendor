import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { combineReducers } from 'redux'
import * as t from 'actions/actionTypes'

import attraction from './attraction'
import attractions from './attractions'
import promotion from './promotion'
import taxes from './taxes'
import tax from './tax'

const middleware = applyMiddleware(promise(), thunk)
const admin = combineReducers({
  attraction,
  attractions,
  promotion,
  tax,
  taxes
})

const rootReducer = (state, action) => {
  if (action.type === t.USER_LOGOUT) {
    state = undefined
  }
  return admin(state, action)
}

export default rootReducer
