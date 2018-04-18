import React from 'react'
import { attractionPath } from 'paths/admin'
import { ActiveSwitch, TableActionButtons } from 'components/shared/table'

const attractionRow = ({ attraction, deleteAttraction, toggleActive }) => {
  return (
    <tr>
      <td>{attraction.id}</td>
      <td>
        <div className={'logo'}>
          <img src={attraction.logo} />
        </div>
      </td>
      <td>{attraction.name}</td>
      <td className={'promotions'}>
        {attraction.promotion_count}
      </td>
      <td>
        <ActiveSwitch
          checked={attraction.active}
          toggleActive={()=>toggleActive(attraction)} />
      </td>
      <td>
        <TableActionButtons
          editPath={attractionPath(attraction.id)}
          confirmText={'Delete Attraction'}
          deleteMessage={deleteMessage}
          deleteItem={()=>deleteAttraction(attraction)} />
      </td>
    </tr>

  )
}


const deleteMessage =
  <p>
    Are you sure you want to <b>DELETE</b> this attraction?
  </p>

export default attractionRow
