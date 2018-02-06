import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors'
import { sendPayment } from './braintree'
import {
  Phone,
  Email,
  CardHolderName,
  CcdNumber,
  CvvNumber,
  PostalCode,
  ExpirationDate
} from 'components/shared/formFields'

class CheckoutForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      totalErrCount: 0,
      errCount:{},
      fields:{}
    }
  }

  _update = (name, value, ecount) => {
    const fields = {...this.state.fields, [name]: value}
    const errCount = {...this.state.errCount, [name]: ecount}
    const totalErrCount = Object.values(errCount).reduce((acc,val)=>(acc+val))
    this.setState({fields, errCount, totalErrCount})
  }

  _sendPayment = () => sendPayment(this.state.fields).then((resp) => {debugger})

  render() {
    const hasErrors = this.state.totalErrCount > 0
    const { fields } = this.state
    return(
      <div>
        <CardHolderName
          value={fields.cardHolderName || ''}
          update={this._update} />
        <CcdNumber
          value={fields.ccdNumber || ''}
          update={this._update} />
        <ExpirationDate
          value={fields.expirationDate || ''}
          update={this._update} />
        <CvvNumber
          value={fields.cvvNumber || ''}
          update={this._update} />
        <PostalCode
          value={fields.postalCode || ''}
          update={this._update} />
        <Email
          value={fields.email || ''}
          update={this._update} />
        <Phone
          value={fields.phone || ''}
          update={this._update} />
        <RaisedButton
          label='Purchase'
          disabled={hasErrors}
          onTouchTap={this._sendPayment}
          labelColor={'#FFF'}
          backgroundColor={deepOrange500}/>
      </div>
    )
  }
}

export default CheckoutForm
