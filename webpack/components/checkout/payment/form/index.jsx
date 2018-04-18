import React from 'react'
import NumberField from './numberField'
import NameField from './nameField'
import ExpirationDateField from './expirationDateField'
import CvcField from './cvcField'
import PostalField from './postalField'

export class PaymentForm extends React.Component {
  render() {
    const { ccd, updateField } = this.props
    return (
      <div className={'ccd-container'}>
        <form className={'ccd-form'}>
          <NumberField value={ccd.number} onChange={updateField} />
          <NameField value={ccd.name} onChange={updateField} />
          <div className={'exp-fields'}>
            <ExpirationDateField value={ccd.expirationDate} onChange={updateField} />
            <CvcField value={ccd.cvc} onChange={updateField} />
          </div>
          <PostalField value={ccd.postal} onChange={updateField} />
        </form>
      </div>
    )
  }
}
export default PaymentForm
