import * as t from '../actionTypes'

const initialState = {
  content: {},
  pageID: null,
  taxes:[],
  tickets:[],
  affiliates:[],
  promoImages:[],
  showSave:false,
  showEdit:false
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.TICKETS_MANAGEMENT_LOADED: {
        return { ...state,
                 content: action.payload.content,
                 pageID: action.payload.id,
                 showSave: false }
      }
      case t.UPDATE_TICKETS_MAIN_TEXT: {
        let newContent = {...state.content}
        newContent['mainText'] = action.payload
        return { ...state, content: newContent, showSave: true }
      }
      case t.TAX_CREATED: {
        let taxes = [ ...state.taxes ]
        taxes.push(action.payload)
        return {...state, taxes}
      }
      case t.TICKETS_LOADED: {
        let newTickets = []
        for (var i = 0; i < action.payload.promotions.length; i++) {
          newTickets.push(action.payload.promotions[i])
        }
        let newTaxes = []
        for (var i = 0; i < action.payload.allTaxes.length; i++) {
          newTaxes.push(action.payload.allTaxes[i])
        }
        return {...state, tickets: newTickets, taxes: newTaxes}
      }
      case t.TICKET_AFFILIATES_LOADED: {
        let newAffiliates = []
        for (var i = 0; i < action.payload.length; i++) {
          newAffiliates.push(action.payload[i])
        }
        return {...state, affiliates: newAffiliates}
      }
      case t.TICKET_PROMO_IMAGES_LOADED: {
        let newPromoImages = []
        for (var i = 0; i < action.payload.length; i++) {
          newPromoImages.push(action.payload[i])
        }
        return {...state, promoImages: newPromoImages}
      }
      case t.PROMO_UPLOAD_FINISHED: {
        let newPromoImages = []
        for (var i = 0; i < action.payload.length; i++) {
          newPromoImages.push(action.payload[i])
        }
        return {...state, promoImages:newPromoImages}
      }
      case t.TICKETS_PAGE_SAVED: {
        return { ...state, showSave: false, showBannerEdit: false }
      }
      case t.REORDER_BANNERS: {
        return { ...state, showSave: true }
      }
      case t.TICKET_UPDATED: {
        let newTickets = []
        let ticket = null
        for (var i = 0; i < state.tickets.length; i++) {
          ticket = state.tickets[i]
          if(ticket.id === action.payload.id){
            newTickets.push(action.payload)
          }else{
            newTickets.push(ticket)
          }
        }
        return {...state, tickets:newTickets}
      }
      case t.TICKET_CREATED: {
        let newTickets = []
        let ticket = null
        for (var i = 0; i < state.tickets.length; i++) {
          ticket = state.tickets[i]
          newTickets.push(ticket)
        }
        newTickets.push(action.payload)
        return {...state, tickets:newTickets}
      }
      case t.TICKET_PROMOTION_ACTIVATED: {
        const payload = action.payload
        let tickets = []
        for (var i = 0; i < state.tickets.length; i++) {
          let ticket = state.tickets[i]
          if(ticket.id === payload.id){
            tickets.push(payload)
          }else{
            tickets.push(ticket)
          }
        }
        return { ...state, tickets }
      }
    }
    return state
}
