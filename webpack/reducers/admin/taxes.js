import * as t from 'actions/actionTypes'

const initialState = {
  taxes: [],
  fetching: false,
  fetched: false
}

export default function adminAttractions(
  state=initialState, action) {
    switch (action.type) {
      case t.DELETED_ADMIN_TAX:
        const remainingTaxes = state.taxes.filter( tax => {
          return tax.id !== action.payload.id
        })
        return { ...state, taxes: remainingTaxes }
        break
      case t.FETCHING_ADMIN_TAXES:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.FETCHED_ADMIN_TAXES:
        return { ...state,
          taxes: action.payload,
          fetching: false,
          fetched: true }
        break
      case t.UPDATED_ADMIN_TAX:
        const updatedTaxes = state.taxes.map(
          tax => {
            if(tax.id === action.payload.id){
              return action.payload
            }
            return tax
          }
        )
        return { ...state, taxes: updatedTaxes }
        break
      case t.CREATED_ADMIN_TAX:
        return { ...state, taxes: [...state.taxes, action.payload] }
        break
    }
    return state
}
