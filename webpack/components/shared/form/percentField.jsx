import React from 'react'
import { toPercentStr } from 'utils/percent'

const PercentField = ({field, value, update, name=null}) => {
  const updatePercentage = (e) => {
    const valStr = e.target.value.replace( /^\D+|\./g, '')
    update(field, valStr)
  }
  return (
    <label className={'pt-label'}>
      {name || field}
      <div className={'pt-input-group'}>
        <input
          className={'pt-input pt-fill'}
          type={'text'}
          value={toPercentStr(value)}
          onChange={(e) => updatePercentage(e)} />
        <span className={'pt-icon pt-icon-percentage'}></span>
      </div>
    </label>
  )
}

export default PercentField
