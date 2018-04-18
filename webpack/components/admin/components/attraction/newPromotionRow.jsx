import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Intent, Tooltip } from '@blueprintjs/core'
import { newAttractionPromotionPath } from 'paths/admin'

const NewPromotionRow = ({ attraction }) =>{
  const newUrl = newAttractionPromotionPath(attraction.id)
  return(
    <tr>
     <td></td>
     <td></td>
     <td></td>
     <td></td>
     <td>
       <Tooltip content={'Create New Promotion'}>
         <Link to={newUrl}>
           <Button
             className={'new-promotion'}
             iconName={'add'}
             intent={Intent.SUCCESS}  />
           </Link>
       </Tooltip>
     </td>
    </tr>
  )
}

export default NewPromotionRow
