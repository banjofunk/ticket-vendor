import React from 'react'
import { ActiveSwitch, TableActionButtons } from 'components/shared/table'

const TaxRow = ({ checked, deleteTax, editPath, tax, toggleActive }) => {
  return (
    <tr>
     <td>{tax.summary}</td>
     <td className={'tax-actions'}>
       <ActiveSwitch
         checked={checked}
         toggleActive={toggleActive} />
     </td>
     <td className={'tax-actions'}>
       <TableActionButtons
         editPath={editPath}
         confirmText={'Delete Tax'}
         deleteMessage={deleteMessage}
         deleteItem={deleteTax} />
     </td>
    </tr>
  )
}

const deleteMessage =
  <p>
    Are you sure you want to <b>DELETE</b> this tax?
    <br/>
    The tax will be removed from <b>ALL PROMOTIONS</b> it is applied to.
  </p>


export default TaxRow
