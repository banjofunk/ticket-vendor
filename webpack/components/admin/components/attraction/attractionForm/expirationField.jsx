import React from 'react'
import { Classes, NumericInput, Position } from '@blueprintjs/core'

const ExpirationField = ({value, update}) => {
  return (
    <div>
      <label className={Classes.LABEL}>
        Expiration Window (in days)
      </label>
      <NumericInput
        buttonPosition={Position.LEFT}
        value={value}
        label={'Expiration Window (in days)'}
        leftIconName={'calendar'}
        minorStepSize={1}
        onValueChange={(value) => update('expiry_window', value)} />
      <br />
    </div>
  )
}

export default ExpirationField
