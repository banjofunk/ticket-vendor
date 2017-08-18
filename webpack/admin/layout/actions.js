import * as t from '../actionTypes'

export function toggleDrawer(payload) {
  return function(dispatch) {
    dispatch({type: t.OPEN_NAV_DRAWER, payload: payload})
  }
}

export function updateViewport(payload) {
  return function(dispatch) {
    dispatch({type: t.UPDATE_VIEWPORT, payload: payload})
  }
}

export function authorizeLayout(roles) {
  return function(dispatch) {
    dispatch({type: t.ROLE_CHECK, payload: roles})

    fetch('/users/roles', {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.AUTHORIZATION_SUCCEEDED, payload: payload})
    })


  }
}
