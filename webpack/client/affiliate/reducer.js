import * as t from '../actionTypes'

const initialState = {
  affiliate: {},
  promotions: [],
  banners: []
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.AFFILIATE_PAGE_LOADED: {
        let newBanners = []
        for (var i = 0; i < action.payload.banners.length; i++) {
          const banner = action.payload.banners[i]
          newBanners.push(banner)
        }
        return {...state, banners: newBanners}
      }
      case t.AFFILIATE_LOADED: {
        return {...state, affiliate: action.payload}
      }
      case t.AFFILIATE_PROMOTIONS_LOADED: {
        let newPromotions = []
        for (var i = 0; i < action.payload.length; i++) {
          const promotion = action.payload[i]
          newPromotions.push(promotion)
        }
        return {...state, promotions: newPromotions}
      }
    }
    return state
}
