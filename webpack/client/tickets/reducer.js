import * as t from '../actionTypes'

const initialState = {
  content: {},
  tickets:[],
  banners:[]
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.TICKETS_PAGE_LOADED: {
        return {...state, content: action.payload.content, banners: action.payload.banners}
      }
      case t.TICKETS_LOADED: {
        let newTickets = []
        for (var i = 0; i < action.payload.length; i++) {
          newTickets.push(action.payload[i])
        }
        return {...state, tickets: newTickets}
      }
    }
    return state
}
