import * as t from 'actions/actionTypes'

const initialState = {
  attractions: [],
  fetching: false,
  fetched: false
}

export default function adminAttractions(
  state=initialState, action) {
    switch (action.type) {

      case t.CREATED_ADMIN_ATTRACTION:
        return { ...state,
          attractions: [ ...state.attractions, action.payload]
        }
        break
      case t.DELETED_ADMIN_ATTRACTION:
        const remainingAttractions = state.attractions.filter( attraction => {
          return attraction.id !== action.payload.id
        })
        return { ...state, attractions: remainingAttractions }
        break
      case t.FETCHING_ADMIN_ATTRACTIONS:
        return { ...state,
          fetching: true,
          fetched: false }
        break
      case t.FETCHED_ADMIN_ATTRACTIONS:
        return { ...state,
          attractions: action.payload,
          fetching: false,
          fetched: true }
        break
      case t.FETCHED_ATTRACTION:
        const updatedAttractions = state.attractions.map(
          attraction => {
            if(attraction.id === action.payload.id){
              return action.payload
            }
            return attraction
          }
        )
        return { ...state, attractions: updatedAttractions }
        break
    }
    return state
}
