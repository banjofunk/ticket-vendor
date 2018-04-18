import React from 'react'
import { CancelButton, CurrencyField, SubmitButton, TextField } from 'components/shared/form'
import { SectionHeader } from 'components/shared/layout'
import { ButtonGroup, Card } from '@blueprintjs/core'
import './promotionForm.scss'

const PromotionForm = ({ cancel, edited, promotion, submit, update }) => {
  const submitText = promotion.id ? 'Save' : 'Create'
  return (
    <Card elevation={1} className={'promotion-form-container'}>
      <SectionHeader
        sectionTitle={'General'}
        side='right' />

      <form className={'promotion-form'}>
        <TextField
          field={'title'}
          update={update}
          value={promotion.title} />
        <CurrencyField
          field={'msrp'}
          update={update}
          value={promotion.msrp} />
        <CurrencyField
          field={'net_price'}
          name={'net price'}
          update={update}
          value={promotion.net_price} />
        <ButtonGroup className={'form-actions pt-fill'}>
          <CancelButton
            enabled={edited}
            cancel={cancel} />
          <SubmitButton
            submitText={submitText}
            enabled={edited}
            submit={submit} />
        </ButtonGroup>
      </form>
    </Card>
  )
}

export default PromotionForm
