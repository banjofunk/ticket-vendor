import React from 'react'
import { toCurrencyStr } from 'utils/currency'
import { calculateTotal, calculateTotalQty } from 'utils/cart'
import { QtyColumn } from './qtyColumn'

const TotalRow = ({ promotions, cart }) => {
  const totalQty = calculateTotalQty(cart)
  const total = calculateTotal(cart, promotions)
  return (
    <tr className={'total-row'}>
      <td></td>
      <td></td>
      <td>Total: </td>
      <td className={'total-qty'}>
        {totalQty}
      </td>
      <td className={'total-cost'}>
        {toCurrencyStr(total)}
      </td>
    </tr>
  )
}

export default TotalRow
