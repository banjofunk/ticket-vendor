import * as t from '../actionTypes'

const initialState = {
  affiliates:[],
  promoImages:[],
  logoImages:[],
  affiliate:{},
  promotions:[],
  showEdit:false
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.AFFILIATES_LOADED: {
        let newAffiliates = []
        for (var i = 0; i < action.payload.length; i++) {
          newAffiliates.push(action.payload[i])
        }
        return { ...state, affiliates:newAffiliates }
      }
      case t.AFFILIATE_CHECKED: {
        let updatedAffiliates = []
        for (var i = 0; i < state.affiliates.length; i++) {
          let affiliate = state.affiliates[i]
          if(affiliate.id === action.payload['id']){
            updatedAffiliates.push(action.payload)
          }else{
            updatedAffiliates.push(affiliate)
          }
        }
        return { ...state, affiliates:updatedAffiliates }
      }
      case t.SHOW_AFFILIATE: {
        let affiliate = state.affiliates.find(
          function(affiliate){
            return affiliate.id === parseInt(action.payload)
          }
        )

        return { ...state, affiliate:affiliate, showEdit:true }
      }
      case t.TOGGLE_ACTIVATE_AFFILIATE: {
        let affiliate = state.affiliates.find(
          function(affiliate){
            return affiliate.id === parseInt(action.payload)
          }
        )

        return { ...state, affiliate:affiliate, showEdit:true }
      }
      case t.HIDE_EDIT: {
        return { ...state, showEdit:false }
      }
      case t.AFFILIATE_PROMOTIONS_LOADED: {
        let newPromotions = []
        for (var i = 0; i < action.payload.length; i++) {
          newPromotions.push(action.payload[i])
        }
        return { ...state, promotions:newPromotions }
      }
      case t.AFFILIATE_PROMO_IMAGES_LOADED: {
        let newPromoImages = []
        for (var i = 0; i < action.payload.length; i++) {
          newPromoImages.push(action.payload[i])
        }
        return { ...state, promoImages:newPromoImages }
      }
      case t.AFFILIATE_LOGO_IMAGES_LOADED: {
        let newLogoImages = []
        for (var i = 0; i < action.payload.length; i++) {
          newLogoImages.push(action.payload[i])
        }
        return { ...state, logoImages:newLogoImages }
      }
      case t.AFFILIATE_LOGO_UPLOAD_FINISHED: {
        let newLogoImages = []
        for (var i = 0; i < action.payload.length; i++) {
          newLogoImages.push(action.payload[i])
        }
        return { ...state, logoImages:newLogoImages }
      }
      case t.PROMOTION_UPDATED: {
        let newPromotions = []
        let ticket = null
        for (var i = 0; i < state.promotions.length; i++) {
          ticket = state.promotions[i]
          if(ticket.id === action.payload.id){
            newPromotions.push(action.payload)
          }else{
            newPromotions.push(ticket)
          }
        }
        return {...state, promotions:newPromotions}
      }
      case t.PROMOTION_ACTIVATED: {
        let updatedPromotions = []
        for (var i = 0; i < state.promotions.length; i++) {
          let promotion = state.promotions[i]
          if(promotion.id === action.payload['id']){
            updatedPromotions.push(action.payload)
          }else{
            updatedPromotions.push(promotion)
          }
        }
        return { ...state, promotions:updatedPromotions }
      }
      case t.AFFILIATE_PROMOTION_ACTIVATED: {
        let updatedPromotions = []
        for (var i = 0; i < state.promotions.length; i++) {
          let promotion = state.promotions[i]
          if(promotion.id === action.payload['id']){
            updatedPromotions.push(action.payload)
          }else{
            updatedPromotions.push(promotion)
          }
        }
        return { ...state, promotions:updatedPromotions }
      }
      case t.AFFILIATE_PROMO_UPLOAD_FINISHED: {
        let newPromoImages = []
        for (var i = 0; i < action.payload.length; i++) {
          newPromoImages.push(action.payload[i])
        }
        return {...state, promoImages:newPromoImages}
      }
      case t.AFFILIATE_PROMOTION_UPDATED: {
        let newPromotions = []
        let promotion = null
        for (var i = 0; i < state.promotions.length; i++) {
          promotion = state.promotions[i]
          if(promotion.id === action.payload.id){
            newPromotions.push(action.payload)
          }else{
            newPromotions.push(promotion)
          }
        }
        return {...state, promotions:newPromotions}
      }
      case t.AFFILIATE_PROMOTION_CREATED: {
        let newPromotions = []
        for (var i = 0; i < state.promotions.length; i++) {
          const promotion = state.promotions[i]
          newPromotions.push(promotion)
        }
        newPromotions.push(action.payload)
        return {...state, promotions:newPromotions}
      }
      case t.AFFILIATE_CREATED: {
        let newAffiliates = []
        let affiliate = null
        for (var i = 0; i < state.affiliates.length; i++) {
          affiliate = state.affiliates[i]
          newAffiliates.push(affiliate)
        }
        newAffiliates.push(action.payload)
        return {...state, affiliates:newAffiliates}
      }
      case t.AFFILIATE_UPDATED: {
        let newAffiliates = []
        let affiliate = null
        for (var i = 0; i < state.affiliates.length; i++) {
          affiliate = state.affiliates[i]
          if(affiliate.id === action.payload.id){
            newAffiliates.push(action.payload)
          }else{
            newAffiliates.push(affiliate)
          }
        }
        return {...state, affiliates:newAffiliates}
      }
    }
    return state
}
