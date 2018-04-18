import React from 'react'
import { Button, Intent, Tooltip } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { newPromotionTaxPath } from 'paths/admin'

const NewTaxRow = ({ promotion }) =>
    <tr>
     <td></td>
     <td></td>
     <td className={'tax-actions'}>
       <Tooltip content={'Create New Tax'}>
         <Link to={newPromotionTaxPath(promotion.id)}>
           <Button
             className={'new-tax'}
             iconName={'add'}
             intent={Intent.SUCCESS}  />
         </Link>
       </Tooltip>
     </td>
    </tr>

export default NewTaxRow
