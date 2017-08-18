import * as t from '../actionTypes'

const initialState = {
  test: "This is your admin settings page test"
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.ADMIN_SETTINGS_LOADED: {
        return { ...state }
      }

    }
    return state
}
