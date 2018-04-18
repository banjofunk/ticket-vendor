import React from 'react'
import { Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { checkoutPath } from 'paths/app'

const CheckoutRow = ({ }) => {
  return (
    <tr className={'total-row'}>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <Link to={checkoutPath('payment')}>
          <Button className={'pt-intent-success pt-fill'}>
            {'Checkout'}
          </Button>
        </Link>
      </td>
      <td></td>
    </tr>
  )
}

export default CheckoutRow
