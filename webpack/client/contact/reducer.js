import * as t from '../actionTypes'

const initialState = {
  content: {},
  banners: [],
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
      case t.CONTACT_LOADED: {
        return {...state, content: action.payload.content, banners: action.payload.banners}
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
