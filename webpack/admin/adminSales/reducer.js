import * as t from '../actionTypes'

const initialState = {
  transactions: [],
  totalPages: 0,
  currentPage: 0,
  resent: true
}

export default function reducer(
  state=initialState, action) {

    switch (action.type) {
      case t.ADMIN_SALES_LOADED: {
        return { ...state }
      }
      case t.TRANSACTIONS_LOADED: {
        return {
          ...state,
          transactions:action.payload.transactions,
          totalPages:action.payload.total_pages,
          currentPage:action.payload.current_page
        }
      }
      case t.TRANSACTION_RESENT: {
        return { ...state, resend:true }
      }

    }
    return state
}
