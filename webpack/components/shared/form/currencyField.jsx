import React from 'react'
import { toCurrencyStr } from 'utils/currency'

const CurrencyField = ({field, value, update, name=null}) => {
  const updateCurrency = (e) => {
    const valStr = e.target.value.replace( /^\D+|\./g, '')
    update(field, parseInt(valStr))
  }
  return (
    <label className={'pt-label'}>
      {name || field}
      <input
        className={'pt-input pt-fill'}
        type={'text'}
        value={toCurrencyStr(value)}
        onChange={(e) => updateCurrency(e)} />
    </label>
  )
}

export default CurrencyField
