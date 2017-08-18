import * as t from '../actionTypes'

const initialState = {
  loggedIn: false,
  viewport: 0,
  name: "",
  authRoles: [],
  authorized:false,
  navbar:{
    openDrawer: false
  }
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.OPEN_NAV_DRAWER: {
        let newNav = { ...state.navbar }
        newNav.openDrawer = !action.payload
        return { ...state, navbar: newNav  }
      }
      case t.ROLE_CHECK: {
        let newRoles = []
        for (var i = 0; i < action.payload.length; i++) {
          newRoles.push(action.payload[i])
        }
        return { ...state, authRoles: newRoles  }
      }
      case t.AUTHORIZATION_SUCCEEDED: {
        let authorized = false
        if(action.payload.roles.length > 0){
          for (var i = 0; i < action.payload.roles.length; i++) {
            let role = action.payload.roles[i]
            if(state.authRoles.indexOf(role) >= 0){
              authorized = true
            }
          }
        }

        if(!authorized){
          setTimeout(function(){
            window.location = '/users/sign_in'
          }, 100)
        }
        return { ...state, authorized:authorized, name:action.payload.name }
      }
      case t.UPDATE_VIEWPORT: {
        return { ...state, viewport:action.payload }
      }

    }
    return state
}
