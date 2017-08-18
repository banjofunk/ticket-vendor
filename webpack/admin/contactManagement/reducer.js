import * as t from '../actionTypes'

const initialState = {
  content: {},
  pageID: null,
  showSave:false,
  formValue:{
    firstName:'',
    lastName:'',
    email:'',
    message:''
  }
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.CONTACT_MANAGEMENT_LOADED: {
        return { ...state,
                 content: action.payload.content,
                 pageID: action.payload.id,
                 showSave: false }
      }
      case t.UPDATE_CONTACT_MAIN_TEXT: {
        let newContent = {...state.content}
        newContent['mainText'] = action.payload
        return { ...state, content: newContent, showSave: true }
      }
      case t.CONTACT_PAGE_SAVED: {
        return { ...state, showSave: false }
      }
      case t.REORDER_BANNERS: {
        return { ...state, showSave: true }
      }
      case t.CONTACT_FORM_SENT: {
        const clearFormValue = {
          firstName:'',
          lastName:'',
          email:'',
          message:''
        }
        return { ...state, formValue: clearFormValue }
      }
    }
    return state
}
