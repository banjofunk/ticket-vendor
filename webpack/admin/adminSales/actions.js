import * as t from '../actionTypes'

export function getTransactions(txnData) {
  let params = ''
  params += `min_date=${txnData.minDate}`
  params += `&max_date=${txnData.maxDate}`
  params += `&page=${txnData.page}`
  params += `&count=${txnData.count}`
  return function(dispatch) {
    fetch(`/api/admin/transactions?${params}`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TRANSACTIONS_LOADED, payload: payload})
    })
  }

}


export function resendTickets(txn, phone, email){
  let payload = {
    id: txn.id,
    phone: phone,
    email: email
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch(`/api/admin/transactions/${txn.id}/resend`, {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.TRANSACTION_RESENT, payload})
    })
  }
}
