import React from 'react'
import { withRouter } from 'react-router-dom'
import { NonIdealState } from '@blueprintjs/core'
import TaxRow from './taxRow'
import NewTaxRow from './newTaxRow'
import { promotionTaxPath } from 'paths/admin'

const TaxTable = ({ actions, match, promotion, taxes }) => {
  const { promotionId } = match.params
  const promotionTaxIds = promotion.taxes.map(p => p.id)
  const taxRows = taxes.map( (tax, idx) => {
    const checked = promotionTaxIds.includes(tax.id)
    const editPath = promotionTaxPath(promotionId, tax.id)
    const deleteTax = () => actions.deleteTax(tax)
    const toggleActive = () => actions.togglePromotionTax(promotion.id, tax.id)

    return(
      <TaxRow
        key={idx}
        checked={checked}
        deleteTax={deleteTax}
        editPath={editPath}
        toggleActive={toggleActive}
        tax={tax} />
    )
  })

  return (
    <table className={'tax-table pt-table pt-striped pt-condensed'}>
      <thead>
        <tr>
          <th>description</th>
          <th className={'tax-actions'}>active</th>
        </tr>
      </thead>
      <tbody>
        {taxRows}
        <NewTaxRow promotion={promotion} />
      </tbody>
    </table>
  )
}

export default withRouter(TaxTable)
