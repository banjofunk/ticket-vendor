import * as t from '../actionTypes'

const initialState = {
  content: {},
  banners:[]
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.ABOUT_LOADED: {
        return {...state, 
          content: action.payload.content,
          banners: action.payload.banners
        }
      }
    }
    return state
}
