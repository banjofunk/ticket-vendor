import React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core'
import classnames from 'classnames'
import ImageField from './imageField'
import DescriptionField from './descriptionField'
import NameField from './nameField'
import SymbologyField from './symbologyField'
import ExpirationField from './expirationField'
import { CancelButton, SubmitButton } from 'components/shared/form'

const AttractionForm = ({attraction, cancel, edited, submit, update}) => {
  return (
    <form className={'attraction-form'}>
      <NameField
        value={attraction.name}
        update={update} />
      <DescriptionField
        value={attraction.description}
        update={update} />
      <SymbologyField
        value={attraction.symbology}
        update={update} />
      <ExpirationField
        value={attraction.expiry_window}
        update={update} />
      <div className={'image-fields'}>
        <ImageField
          name={'logo'}
          src={attraction.logo}
          update={update} />
        <ImageField
          name={'attraction_image'}
          src={attraction.attraction_image}
          update={update} />
        <div className={'clearfix'}></div>
      </div>
      <div className={'actions-container'}>
        <ButtonGroup className={'form-actions pt-fill'}>
          <CancelButton
            enabled={edited}
            cancel={cancel} />
          <SubmitButton
            submitText={'Save'}
            enabled={edited}
            submit={submit} />
        </ButtonGroup>
      </div>
    </form>
  )
}

export default AttractionForm
