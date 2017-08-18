import * as t from '../actionTypes'

const initialState = {
  banners: [],
  allBanners: [],
  showBannerEdit: false,
  showBannerAdd: false
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.ALL_BANNERS_LOADED: {
        let newAllBanners = []
        for (var i = 0; i < action.payload.length; i++) {
          newAllBanners.push(action.payload[i])
        }
        return { ...state, allBanners:newAllBanners }
      }
      case t.PAGE_BANNERS_LOADED: {
        let newBanners = []
        for (var i = 0; i < action.payload.length; i++) {
          newBanners.push(action.payload[i])
        }
        return { ...state, banners:newBanners }
      }
      case t.ADD_BANNER: {
        let newBanners = []
        for (var i = 0; i < action.payload.length; i++) {
          newBanners.push(action.payload[i])
        }
        return { ...state, banners:newBanners, showBannerAdd:false }
      }
      case t.REMOVED_BANNER: {
        let newBanners = []
        for (var i = 0; i < action.payload.length; i++) {
          newBanners.push(action.payload[i])
        }
        return { ...state, banners:newBanners }
      }
      case t.DELETED_BANNER: {
        let newAllBanners = []
        for (var i = 0; i < action.payload.length; i++) {
          newAllBanners.push(action.payload[i])
        }
        return { ...state, allBanners:newAllBanners }
      }
      case t.REORDER_BANNERS: {
        return { ...state, banners: action.payload }
      }
      case t.TOGGLE_BANNER_EDIT: {
        return { ...state, showBannerEdit: !action.payload }
      }
      case t.TOGGLE_BANNER_ADD: {
        return { ...state, showBannerAdd: !action.payload }
      }
      case t.BANNER_UPLOAD_FINISHED: {
        let newAllBanners = []
        for (var i = 0; i < action.payload.length; i++) {
          newAllBanners.push(action.payload[i])
        }
        return { ...state, allBanners:newAllBanners }
      }

    }
    return state
}
