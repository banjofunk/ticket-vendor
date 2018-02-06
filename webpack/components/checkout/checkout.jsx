import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Tab2, Tabs2, Button } from '@blueprintjs/core'
import CheckoutForm from './checkoutForm'
import { PageLayout, SectionDivider, SectionHeader } from 'components/shared/layout'
import { ShoppingCart, CardPayment, TicketSummary } from './tabs'

require('./checkout.scss')

@connect((store) => {
  return {
    cart: store.checkout.cart,
    promotions: store.checkout.promotions
  }
})
class Checkout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cart:[],
      checkoutView:'cart'
    }
  }

  _changeCheckoutView = (checkoutView) => this.setState({ checkoutView });

  render(){
    let checkoutView
    switch (this.state.checkoutView) {
      case 'payment': { checkoutView = <CardPayment /> }
      case 'summary': { checkoutView = <TicketSummary /> }
      default:        { checkoutView = <ShoppingCart /> }
    }
    return(
      <PageLayout>
        <SectionHeader sectionTitle="Shopping Cart" side='left' />
        <SectionDivider height={'15px'} color={'white'} />
        <SectionDivider height={'15px'} />
        <SectionDivider height={'10px'} color={'#414142'} />
        <SectionDivider height={'10px'} color={'white'} />
        <div className={'progress-container'}>
          <ul class="progressbar">
            <li icon={'cart'} class="active">Cart</li>
            <li icon={'payment'}>Payment</li>
            <li icon={'ticket'}>Tickets</li>
          </ul>
        </div>
          <div className={'tabs-container'}>
            <Tabs2
              onChange={this.handleTabChange}
              animate={true}
              vertical={true}>
                <Tab2 id="cart" title="Cart" panel={<ShoppingCart />} />
                <Tab2 id="payment" title="Payment" panel={<CardPayment />} />
                <Tab2 id="tickets" title="Tickets" panel={<TicketSummary />} />
                <Tabs2.Expander />
            </Tabs2>
          </div>
      </PageLayout>
    )
  }
}

export default Checkout
