import * as t from '../actionTypes'

export function getPage(page) {
  return function(dispatch) {
    fetch(`/api/pages/get_page?name=${page}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ABOUT_LOADED, payload: payload})
    })
  }
}
