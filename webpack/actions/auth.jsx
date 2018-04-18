import * as t from 'actions/actionTypes'
import { fetchJSON } from 'utils'
import { authPath, signInPath, signOutPath } from 'paths/api'

export function getAuth() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_AUTH })
    fetchJSON(authPath())
    .then( payload =>
      dispatch({type: t.FETCHED_AUTH, payload })
    )
  }
}

export function signOut() {
  return function(dispatch) {
    fetchJSON(signOutPath())
    .then( payload =>
      dispatch({type: t.USER_LOGOUT })
    )
  }
}

export function signIn(user) {
  return function(dispatch) {
    dispatch({type: t.FETCHING_AUTH })
    fetchJSON(signInPath(), {
      method: 'POST',
      body: JSON.stringify({ user })
    })
    .then( payload => {
      dispatch({type: t.USER_LOGIN, payload })
    })
    .catch(error => {
      dispatch({type: t.ERROR_MESSAGE, payload: error})
    })

  }
}
