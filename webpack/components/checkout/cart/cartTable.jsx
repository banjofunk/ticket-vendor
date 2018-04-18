import React from 'react'
import CartRow from './cartRow'
import TotalRow from './totalRow'
import CheckoutRow from './checkoutRow'
import { Button, NonIdealState, Spinner, Intent } from '@blueprintjs/core'
import './tabs.scss'

class CartTable extends React.Component {
  render(){
    const { cartActions, cart, promotions } = this.props
    const cartItems = promotions
      ? Object.keys(cart).map( key =>
          <CartRow
            key={`promo-${key}`}
            actions={cartActions}
            promotion={promotions[key]}
            qty={cart[key]} /> )
      : <tr></tr>

    if(Object.keys(cart).length === 0){
      return (
        <NonIdealState
          visual="error"
          title="there are no items in your cart" />
      )
    }

    if(!promotions){
      return <Spinner intent={Intent.PRIMARY} />
    }

    return(
      <table className={'pt-table pt-striped pt-condensed'}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Tax</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems}
          <TotalRow cart={cart} promotions={promotions} />
          <CheckoutRow />
        </tbody>
      </table>
    )
  }

}

export default CartTable
