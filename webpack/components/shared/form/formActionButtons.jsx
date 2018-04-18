import React from 'react'
import { ButtonGroup } from '@blueprintjs/core'
import CancelButton from './cancelButton'
import SubmitButton from './submitButton'

const FormActionButtons = ({cancel, edited, submit, submitText}) => {
  return (
    <ButtonGroup className={'form-actions pt-fill'}>
      <CancelButton
        cancel={cancel} />
      <SubmitButton
        submitText={submitText}
        enabled={edited}
        submit={submit} />
    </ButtonGroup>
  )
}

export default FormActionButtons
