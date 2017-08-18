import * as t from '../actionTypes'

const initialState = {
  content: {},
  pageID: null,
  showSave:false,
  redemptionCode: "",
  promotions: [],
  showSortPromotions: false,
  sponsors: [],
  showSortSponsors: false,
  attractions: [],
  showSortAttractions: false
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.HOME_MANAGEMENT_LOADED: {
        return { ...state,
                 content: action.payload.content,
                 pageID: action.payload.id,
                 showSave: false }
      }
      case t.HOME_PAGE_SAVED: {
        return {
          ...state,
          showSave: false,
          showSortAttractions: false,
          showSortSponsors: false,
          showSortPromotions: false
        }
      }
      case t.REORDER_BANNERS: {
        return { ...state, showSave: true }
      }
      case t.UPDATE_REDEMPTION:
        return { ...state, redemptionCode:action.payload }
      break
      case t.SUBMIT_REDEMPTION:
        return { ...state, redemptionCode:"" }
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
      case t.REORDER_PROMOTIONS:
        let statePromotions = []
        for (var i = 0; i < action.payload.length; i++) {
          let promotion = state.promotions.find(
            function(promo){
              return promo.id === action.payload[i].id
            }
          )
          promotion.position = action.payload[i].position
          statePromotions.push(promotion)
        }
        return { ...state, promotions:statePromotions, showSave: true }
      break
      case t.REORDER_SPONSORS:
        let stateSponsors = []
        for (var i = 0; i < action.payload.length; i++) {
          let sponsor = state.sponsors.find(
            function(sponsor){
              return sponsor.id === action.payload[i].id
            }
          )
          sponsor.sponsor_sort = action.payload[i].position
          stateSponsors.push(sponsor)
        }
        return { ...state, sponsors:stateSponsors, showSave: true }
      break
      case t.REORDER_ATTRACTIONS:
        let stateAttractions = []
        for (var i = 0; i < action.payload.length; i++) {
          let attraction = state.attractions.find(
            function(attraction){
              return attraction.id === action.payload[i].id
            }
          )
          attraction.attraction_sort = action.payload[i].position
          stateAttractions.push(attraction)
        }
        return { ...state, attractions:stateAttractions, showSave: true }
      break
      case t.TOGGLE_SORT_PROMOTIONS:
        return { ...state, showSortPromotions: !action.payload }
      break
      case t.TOGGLE_SORT_SPONSORS:
        return { ...state, showSortSponsors: !action.payload }
      break
      case t.TOGGLE_SORT_ATTRACTIONS:
        return { ...state, showSortAttractions: !action.payload }
      break

    }
    return state
}
