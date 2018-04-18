import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Intent, Tooltip } from '@blueprintjs/core'
import { newAttractionPath } from 'paths/admin'

const NewAttractionRow = () =>{
  return(
    <tr>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td>
       <Tooltip content={'Create New Attraction'}>
         <Link to={newAttractionPath()}>
           <Button
             className={'new-attraction'}
             iconName={'add'}
             intent={Intent.SUCCESS}  />
           </Link>
       </Tooltip>
     </td>
    </tr>
  )
}

export default NewAttractionRow
