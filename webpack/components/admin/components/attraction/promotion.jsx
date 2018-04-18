import React from 'react'
import { Button, Switch } from '@blueprintjs/core'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { toCurrencyStr } from 'utils/currency'
import { promotionPath } from 'paths/admin'
import { ActiveSwitch, TableActionButtons } from 'components/shared/table'

const Promotion = ({ deletePromotion, promotion, toggleActive }) => {
  const editPath = promotionPath(promotion.id)
  return (
    <tr>
      <td>{promotion.title}</td>
      <td>{toCurrencyStr(promotion.msrp)}</td>
      <td>{toCurrencyStr(promotion.net_price)}</td>
      <td>
        <ActiveSwitch
          checked={promotion.active}
          toggleActive={()=>toggleActive(promotion)} />
      </td>
      <td>
        <TableActionButtons
          editPath={editPath}
          confirmText={'Delete Promotion'}
          deleteMessage={deleteMessage}
          deleteItem={()=>deletePromotion(promotion)} />
      </td>
    </tr>
  )
}

const deleteMessage =
  <p>
    Are you sure you want to <b>DELETE</b> this promotion?
  </p>


export default Promotion
