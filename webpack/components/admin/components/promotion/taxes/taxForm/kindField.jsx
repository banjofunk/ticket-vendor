import React from 'react'

const KindField = ({value, update}) => {
  return (
    <label className={'pt-label'}>
      kind
      <div className='pt-select'>
        <select
          onChange={(e) => update('kind', parseInt(e.target.value))}
          value={value}>
          <option value='0'>Percent</option>
          <option value='1'>Flat Fee</option>
        </select>
      </div>
    </label>
  )
}

export default KindField
