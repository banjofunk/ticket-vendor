import React from 'react'
import classnames from 'classnames'
import { Button } from '@blueprintjs/core'

const SubmitButton = ({ enabled=true, submit, submitText }) => {
  return (
    <Button
      className={classnames(
        'pt-fill',
        enabled && 'pt-intent-success',
        !enabled && 'pt-disabled'
      )}
      onClick={submit}>
      {submitText}
    </Button>
  )
}

export default SubmitButton
