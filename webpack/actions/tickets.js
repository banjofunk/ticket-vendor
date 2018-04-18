import * as t from 'actions/actionTypes'
import Cookies from 'universal-cookie'

export function getTickets() {
  return function(dispatch) {
    dispatch({type: t.FETCHING_TICKETS, payload })
    const cookies = new Cookies()
    const payload = cookies.get('tickets')
    dispatch({type: t.FETCHED_TICKETS, payload })
  }
}

export function setTickets(tickets) {
  return function(dispatch) {
    const cookies = new Cookies()
    cookies.set('tickets', tickets, { path: '/' })
    const payload = cookies.get('tickets')
    dispatch({type: t.UPDATED_TICKETS, payload })
  }
}
