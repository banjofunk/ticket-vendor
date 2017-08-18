import * as t from '../actionTypes'

export function adminSettingsLoaded(data) {
  return function(dispatch) {
    dispatch({ type: t.ADMIN_SETTINGS_LOADED, payload: data })
  }
}
