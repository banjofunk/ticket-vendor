import React from 'react'

const PaymentError = ({error}) => {
  return (
    <div class='pt-callout pt-intent-danger'>
      {error.message}
    </div>
  )
}

export default PaymentError
