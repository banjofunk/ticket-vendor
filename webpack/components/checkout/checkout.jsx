import React from 'react'
import { withRouter, Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as cartActionCreators from 'actions/cart';
import * as ticketActionCreators from 'actions/tickets';
import * as promotionActionCreators from 'actions/promotions';
import { Card } from '@blueprintjs/core'
import { PageLayout, SectionHeader } from 'components/shared/layout'
import { CartTable } from './cart'
import { Payment } from './payment'
import { Tickets } from './tickets'
import { Progress } from './progress'
import { checkoutPath } from 'paths/app'

require('./checkout.scss')

class ShoppingCart extends React.Component {
  componentWillMount(){
    if(!this.props.cartFetched){
      this.props.cartActions.getCart()
    }
    if(!this.props.ticketsFetched){
      this.props.ticketActions.getTickets()
    }
    if(!this.props.promotionsFetched){
      this.props.promotionActions.getPromotions()
    }
  }
  render(){
    const { cart, cartActions, promotions, tickets, ticketActions } = this.props

    const routes = [
      {
        path: "/checkout",
        exact: true,
        title: () => <span>Shopping Cart</span>,
        progress: () => <Progress activeClass={['cart']} />,
        main: () =>
          <Redirect to={checkoutPath('cart')} />
      },
      {
        path: "/checkout/cart",
        exact: true,
        title: () => <span>Shopping Cart</span>,
        progress: () => <Progress activeClass={['cart']} />,
        main: () =>
          <CartTable
            cart={cart}
            promotions={promotions}
            cartActions={cartActions} />
      },
      {
        path: '/checkout/payment',
        title: () => <span>Payment</span>,
        progress: () => <Progress activeClass={['cart', 'payment']} />,
        main: () =>
          <Payment
            cart={cart}
            promotions={promotions}
            cartActions={cartActions}
            ticketActions={ticketActions} />
      },
      {
        path: '/checkout/tickets',
        title: () => <span>Tickets</span>,
        progress: () => <Progress activeClass={['cart', 'payment', 'tickets']} />,
        main: () =>
          <Tickets
            cart={cart}
            tickets={tickets} />
      }
    ]

    return(
      <PageLayout>
        <SectionHeader sectionTitle={'Checkout'} side='left' />
        <div className={'progress-container'}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.progress} />
          ))}
        </div>

        <div className={'checkout-tab'}>
        <Card
          className={'checkout-card'}
          elevation={1}>
          <SectionHeader sectionTitle={
            routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.title} />
            ))
          } side='right' />
          <br />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main} />
          ))}
        </Card>
      </div>
      </PageLayout>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  cartActions: bindActionCreators(cartActionCreators, dispatch),
  ticketActions: bindActionCreators(ticketActionCreators, dispatch),
  promotionActions: bindActionCreators(promotionActionCreators, dispatch)
})

const mapStateToProps = (state, ownProps) => ({
  cart: state.cart.cart,
  cartFetched: state.cart.fetched,
  promotions: state.promotions.promotions,
  promotionsFetched: state.promotions.fetched,
  tickets: state.tickets.tickets,
  ticketsFetched: state.tickets.fetched
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
)
