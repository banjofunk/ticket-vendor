import * as t from 'actions/actionTypes'

const initialState = {
  attraction: {
    name:'',
    description: '',
    logo: '',
    promotions: []
  },
  edited: false,
  fetching: false,
  fetched: false
}

export default function attractions(
  state=initialState, action) {
    switch (action.type) {
      case t.CLEAR_ADMIN_ATTRACTION:
        return initialState
        break
      case t.FETCHING_ATTRACTION:
        return { ...state, fetching: true }
        break
      case t.CREATED_ADMIN_PROMOTION:
        return { ...state,
          attraction: { ...state.attraction,
            promotions: [ ...state.attraction.promotions, action.payload ]
          }
        }
        break
      case t.DELETED_ADMIN_PROMOTION:
        const remainingPromotions = state.attraction.promotions.filter( promotion => {
          return promotion.id !== action.payload.id
        })
        return { ...state,
          attraction:{ ...state.attraction,
            promotions: remainingPromotions
          }
        }
        break
      case t.CREATED_ADMIN_ATTRACTION:
      case t.FETCHED_ATTRACTION:
        return { ...state,
          attraction: action.payload,
          edited: false,
          fetching: false,
          fetched: true
        }
        break
      case t.UPDATE_ATTRACTION_FORM:
        let attraction = {...state.attraction}
        const { field, value } = action.payload
        attraction[field] = value
        return { ...state,
          attraction,
          edited: true
        }
        break
      case t.FETCHED_ADMIN_PROMOTION:
        const updatedPromotions = state.attraction.promotions.map( promotion => {
          if(promotion.id === action.payload.id){ return action.payload }
          return promotion
        })
        return { ...state,
          attraction: { ...state.attraction,
            promotions: updatedPromotions
          }
        }
        break
    }
    return state
}
