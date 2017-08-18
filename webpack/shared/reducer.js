import * as t from './actionTypes'

const initialState = {}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.SHARED_LOADED: {
        return {...state}
      }

    }
    return state
}
