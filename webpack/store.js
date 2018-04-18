import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from 'reducers/rootReducer'

const middleware = applyMiddleware(promise(), thunk)

export default createStore(reducer, middleware)
