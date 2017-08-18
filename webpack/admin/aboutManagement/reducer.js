import * as t from '../actionTypes'

const initialState = {
  content: {},
  pageID: null,
  showSave:false
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.ABOUT_MANAGEMENT_LOADED: {
        return { ...state,
                 content: action.payload.content,
                 pageID: action.payload.id,
                 showSave: false }
      }
      case t.UPDATE_ABOUT_MAIN_TEXT: {
        let newContent = {...state.content}
        newContent['mainText'] = action.payload
        return { ...state, content: newContent, showSave: true }
      }
      case t.ABOUT_PAGE_SAVED: {
        return { ...state, showSave: false }
      }
      case t.REORDER_BANNERS: {
        return { ...state, showSave: true }
      }
    }
    return state
}
