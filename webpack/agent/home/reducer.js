import * as t from '../actionTypes'

const initialState = {
  agentEmail:"",
  clientToken:"",
  clearCookie:false,
  btResponse:{},
  redemptionCode: "",
  redemptionCodes: [],
  redemptionSelection: [],
  banners: [],
  promotions: [],
  sponsors: [],
  attractions: [],
  promotionsLoaded:false
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case t.CLIENT_TOKEN_LOADED: {
      return {...state, clientToken: action.payload.token}
    }
    case t.CHECKOUT_COMPLETED: {
      let newState = {...state}
      newState.btResponse = action.payload
      if(action.payload.success){
        newState.clearCookie = true
        newState.redemptionCodes = []
      }
      return newState
    }
    case t.CHECKOUT_COOKIE_RESET: {
      return {...state, clearCookie:false}
    }
    case t.REMOVE_REDEMPTION:
      return { ...state, redemptionCodes:action.payload }
    break
    case t.UPDATE_REDEMPTION:
      return { ...state, redemptionCode:action.payload }
    break
    case t.CLEAR_REDEMPTION_SELECTION:
      return {...state, redemptionSelection:[]}
    break
    case t.SUBMIT_REDEMPTION:
      let redemptionCodes = []
      let redemptionSelection = []
      for (var i = 0; i < state.redemptionCodes.length; i++) {
        redemptionCodes.push(state.redemptionCodes[i])
      }
      if(action.payload){
        if(action.payload.length === 1){
          if(state.redemptionSelection.length > 5){
            redemptionCodes.push(action.payload[0])
            redemptionSelection = state.redemptionSelection
          }else{
            redemptionCodes.push(action.payload[0])
          }
        }else if (action.payload.length > 1) {
          redemptionSelection = action.payload
        }
      }
      return { ...state, redemptionCodes, redemptionSelection }
    break
    case t.PROMOTIONS_LOADED:
      let newPromotions = []
      for (var i = 0; i < action.payload.length; i++) {
        newPromotions.push(action.payload[i])
      }
      return { ...state, promotions:newPromotions, promotionsLoaded:true }
    break
    case t.SPONSORS_LOADED:
      let newSponsors = []
      for (var i = 0; i < action.payload.length; i++) {
        newSponsors.push(action.payload[i])
      }
      return { ...state, sponsors:newSponsors }
    break
    case t.ATTRACTIONS_LOADED:
      let newAttractions = []
      for (var i = 0; i < action.payload.length; i++) {
        newAttractions.push(action.payload[i])
      }
      return { ...state, attractions:newAttractions }
    break
    case t.ADD_TO_CART:
      return {...state, promotionsLoaded:false}
    break
  }

  return state
}
