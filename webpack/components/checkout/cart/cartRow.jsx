import React from 'react'
import { Popover, PopoverInteractionKind } from '@blueprintjs/core'
import { qtyToCurrencyStr, toCurrencyStr } from 'utils/currency'
import {QtyColumn} from './qtyColumn'

const CartRow = ({ actions, promotion, qty }) => {
  const taxes = promotion.taxes.map( (tax, idx) =>
    <p key={idx}>
      {tax.summary}
    </p>
  )
  return (
    <tr>
      <td>{promotion.title}</td>
      <td>{toCurrencyStr(promotion.net_price)}</td>
      <td>
        <Popover
          interactionKind={PopoverInteractionKind.HOVER}>
          <span>{toCurrencyStr(promotion.tax_total)}</span>
          <div className={'tax-popover'}>
            {taxes}
          </div>
        </Popover>
      </td>
      <td>
        <QtyColumn id={promotion.id} qty={qty} actions={actions} />
      </td>
      <td>
        {qtyToCurrencyStr(qty, promotion.raw_total)}
      </td>
    </tr>
  )
}

export default CartRow
