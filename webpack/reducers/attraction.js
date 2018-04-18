import * as t from 'actions/actionTypes'

const initialState = {
  attraction: {
    name:'',
    description: '',
    logo: '',
    promotions: []
  },
  fetching: false,
  fetched: false
}

export default function attractions(
  state=initialState, action) {
    switch (action.type) {
      case t.FETCHING_ATTRACTION:
        return { ...initialState,
          fetching: true,
          fetched: false }
        break
      case t.FETCHED_ATTRACTION:
        return { ...state,
          attraction: action.payload,
          fetching: false,
          fetched: true }
        break
    }
    return state
}
