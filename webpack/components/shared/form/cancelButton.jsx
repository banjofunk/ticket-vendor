import React from 'react'
import classnames from 'classnames'
import { Button } from '@blueprintjs/core'

const CancelButton = ({ cancel, enabled=true }) => {
  return (
    <Button
      className={classnames(
        'pt-fill'
      )}
      disabled={!enabled}
      onClick={cancel}>
      Cancel
    </Button>
  )
}

export default CancelButton
