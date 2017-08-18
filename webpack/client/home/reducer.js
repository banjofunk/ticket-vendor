import * as t from '../actionTypes'

const initialState = {
  redemptionCode: "",
  redemptionCodes: [],
  redemptionSelection: [],
  banners: [],
  promotions: [],
  sponsors: [],
  attractions: []
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case t.HOME_PAGE_LOADED: {
      let newBanners = []
      for (var i = 0; i < action.payload.banners.length; i++) {
        const banner = action.payload.banners[i]
        newBanners.push(banner)
      }

      return { ...state, banners:[], banners: newBanners}
    }
    case t.UPDATE_REDEMPTION:
      return { ...state, redemptionCode:action.payload }
    break
    case t.SUBMIT_REDEMPTION:
      let redemptionCodes = []
      let redemptionSelection = []
      for (var i = 0; i < state.redemptionCodes.length; i++) {
        redemptionCodes.push(state.redemptionCodes[i])
      }
      if(action.payload){
        if(action.payload.length === 1){
          redemptionCodes.push(action.payload[0])
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
      return { ...state, promotions:newPromotions }
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
  }

  return state
}
