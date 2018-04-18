import React from 'react'
import { Classes } from '@blueprintjs/core'

const SymbologyField = ({value, update}) => {
  return (
    <label className={Classes.LABEL}>
      barcode symbology
      <div className={Classes.SELECT}>
        <select
          onChange={(e) => update('symbology', e.target.value)}
          value={value}>
          <option value=''>Numerical</option>
          <option value='Code39'>Code 39</option>
          <option value='Code128'>Code 128</option>
        </select>
      </div>
    </label>
  )
}

export default SymbologyField
