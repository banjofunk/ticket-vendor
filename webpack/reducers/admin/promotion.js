import * as t from 'actions/actionTypes'

const initialState = {
  promotion: {
    id:null,
    title:'',
    msrp: 0,
    net_price: 0,
    taxes:[]
  },
  edited: false,
  exported: false,
  fetching: false,
  fetched: false
}

export default function attractions(
  state=initialState, action) {
    switch (action.type) {
      case t.CLEAR_ADMIN_PROMOTION:
        return initialState
        break
      case t.EXPORTED_ADMIN_ADMISSIONS:
        return { ...state, exported: true }
        break
      case t.FETCHING_ADMIN_PROMOTION:
        return { ...state, fetching: true }
        break
      case t.CREATED_ADMIN_PROMOTION:
      case t.DELETED_ADMIN_ADMISSIONS:
      case t.FETCHED_ADMIN_PROMOTION:
      case t.UPLOADED_ADMIN_ADMISSIONS:
        return { ...state,
          promotion: action.payload,
          edited: false,
          exported: false,
          fetching: false,
          fetched: true
        }
        break
      case t.UPDATE_PROMOTION_FORM:
        let promotion = {...state.promotion}
        const { field, value } = action.payload
        promotion[field] = value
        return { ...state,
          promotion,
          edited: true
        }
        break
    }
    return state
}
