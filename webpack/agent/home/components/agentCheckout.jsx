import React from 'react'
import * as actions from '../actions'
import cookie from 'react-cookie'
import { deepOrange500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'
import SectionHeader from '../../home/components/sectionHeader'
import CheckoutForm from './form/checkoutForm'
import RedemptionCheckoutForm from './form/redemptionCheckoutForm'
import SuccessView from './dialogs/success'
import ErrorsDialog from './dialogs/errorsDialog'
import Loading from './form/loading'

class AgentCheckout extends React.Component {
  constructor(props){
    super(props)
    this._submitForm = this._submitForm.bind(this)
    this._submitRedemptionForm = this._submitRedemptionForm.bind(this)
    this._goToTickets = this._goToTickets.bind(this)
    this.state = {
      cart:[]
    }
  }

  componentWillMount(){
    let cartCookie = cookie.load('cartCookie')
    let cart = Array.isArray(cartCookie) ? cartCookie : []
    this.setState({cart:cart})
    const cartIds = cart.map(
      function(item){ return item.id}
    ).join(',')
  }

  _goToTickets(){
    this.props.changeView('cart')
    window.location = this.props.btResponse.ticket_link
  }

  _submitForm(payload){
    const formState = this.refs.checkoutForm.state
    const data = {
      nonce: payload.nonce,
      cart: this.state.cart
    }
    const refs = this.refs.checkoutForm.refs
    Object.keys(refs).map(function(refKey){
      const dataKey = refKey.replace('Field', '')
      data[dataKey] = refs[refKey].state.value
    })
    this.props.sendPayment(data)
  }

  _submitRedemptionForm(payload){
    const formState = this.refs.redemptionCheckoutForm.state
    const data = {
      nonce: '',
      cart: []
    }
    const refs = this.refs.redemptionCheckoutForm.refs
    Object.keys(refs).map(function(refKey){
      const dataKey = refKey.replace('Field', '')
      data[dataKey] = refs[refKey].state.value
    })

    this.props.sendPayment(data)
  }

  render() {
    const style = {
      container: {
        width:'100%',
        maxWidth:'1100px',
        minHeight:520,
        margin:'0 auto',
        textAlign:'center'
      }
    }

    let currentView
    switch (this.props.viewState) {
      case 'checkout':
        if(this.props.grandTotal === "0.00"){
          currentView =
            <RedemptionCheckoutForm
              ref='redemptionCheckoutForm'
              changeView={this.props.changeView}
              submitForm={this._submitRedemptionForm} />
        }else{
          currentView =
            <CheckoutForm
              ref='checkoutForm'
              total={this.props.grandTotal}
              changeView={this.props.changeView}
              submitForm={this._submitForm}
              clientToken={this.props.clientToken} />
        }
        break
      case 'success':
        currentView =
          <SuccessView
            btResponse={this.props.btResponse}
            goToTickets={this._goToTickets} />
        break
      case 'errors':
        currentView =
          <ErrorsDialog
            btResponse={this.props.btResponse}
            changeView={this.props.changeView} />
        break
      case 'loading':
        currentView =
          <Loading />
        break
    }

    return(
      <div style={style.container}>
        <SectionHeader sectionTitle='Shopping Cart' color={deepOrange500} side='left' />
        {currentView}
      </div>
    )
  }
}

export default AgentCheckout
