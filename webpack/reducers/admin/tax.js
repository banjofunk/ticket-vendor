import * as t from 'actions/actionTypes'

const initialState = {
  tax: {
    amount: 0.0,
    description: '',
    kind: 0
  },
  edited: false,
  fetching: false,
  fetched: false
}

export default function adminTax(
  state=initialState, action) {
    switch (action.type) {
      case t.CLEAR_ADMIN_TAX:
        return initialState
        break
      case t.FETCHING_ADMIN_TAX:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.CREATED_ADMIN_TAX:
      case t.FETCHED_ADMIN_TAX:
      case t.UPDATED_ADMIN_TAX:
        return { ...state,
          tax: action.payload,
          edited: false,
          fetching: false,
          fetched: true }
        break
      case t.UPDATE_TAX_FORM:
        let tax = {...state.tax}
        const { field, value } = action.payload
        tax[field] = value
        return { ...state,
          tax,
          edited: true
        }
        break
    }
    return state
}
