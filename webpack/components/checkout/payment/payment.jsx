import React from 'react'
import { Redirect } from 'react-router-dom'
import Cards from 'react-credit-cards'
import PaymentForm from './form'
import PaymentError from './paymentError'
import { Button, NonIdealState } from '@blueprintjs/core'
import { calculateTotal } from 'utils/cart'
import { toCurrency } from 'utils/currency'
import { checkoutPath } from 'paths/app'
// Providers
import * as braintree from './providers/braintree'

import './payment.scss'

export class Payment extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      error: null,
      fetching: false,
      redirect: false,
      ccd: {
        name: 'Test Testerson',
        number: '4111111111111111',
        expirationDate: '11/21',
        cvc: '111',
        postal: '11121',
        focused: ''
      }
    }
  }

  _sendPayment = (e) => {
    const { cart, promotions, cartActions, ticketActions } = this.props
    const { ccd } = this.state

    this.setState({ error: null, fetching: true })
    const cartTotal = calculateTotal(cart, promotions)
    const amount = toCurrency(cartTotal)

    braintree.sendPayment( ccd, amount, cart )
    .then( resp => {
      if(resp.type === 'Error'){ throw resp }
      this.setState({ fetching: false, redirect: true })
      cartActions.clearCart()
      ticketActions.setTickets(resp)
    })
    .catch( err => {
      const error = err.details
       ? err.details.originalError.error
       : err
      this.setState({ fetching: false, error })
    })
  }

  _updateField = (focused, value) => {
    const ccd = {
      ...this.state.ccd,
      focused,
      [focused] : value
    }
    this.setState({ ccd })
  }

  _disableSubmit() {
    const { ccd, fetching } = this.state
    return !(
      !fetching &&
      ccd.name.trim() &&
      ccd.number.trim() &&
      ccd.expirationDate.trim() &&
      ccd.cvc.trim() &&
      ccd.postal.trim()
    )
  }

  render() {
    const { ccd, error, fetching, redirect } = this.state
    const { cart } = this.props

    if(redirect){ return <Redirect to={checkoutPath('tickets')} /> }
    if(Object.keys(cart).length === 0){
      return (
        <NonIdealState
          visual="error"
          title="there are no items in your cart" />
      )
    }

    return (
      <div>
        <Cards
          number={ccd.number}
          name={ccd.name}
          expiry={ccd.expirationDate}
          cvc={ccd.cvc}
          focused={ccd.focused} />
        {error && <PaymentError error={error} />}
        <PaymentForm
          ccd={ccd}
          updateField={this._updateField} />
        <Button
          className={'pt-intent-primary payment-submit'}
          disabled={this._disableSubmit()}
          onClick={this._sendPayment}>
          {'Submit Payment'}
        </Button>
      </div>
    )
  }
}

export default Payment
