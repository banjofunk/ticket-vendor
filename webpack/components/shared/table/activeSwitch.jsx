import React from 'react'
import { Intent, Switch, Tooltip } from '@blueprintjs/core'

const ActiveSwitch = ({checked, toggleActive}) => {
  return (
    <Tooltip
      content={checked ? 'Deactivate' : 'Activate'}
      intent={checked ? Intent.WARNING : Intent.SUCCESS}>
      <Switch
        className={'active'}
        checked={checked}
        onChange={toggleActive} />
    </Tooltip>
  )
}

export default ActiveSwitch
