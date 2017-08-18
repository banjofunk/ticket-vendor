import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import CartUpsells from './cart/cartUpsells'
import { deepOrange500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'
import RedemptionCheckoutForm from './form/redemptionCheckoutForm'
import SectionHeader from '../../home/components/sectionHeader'
import CheckoutForm from './form/checkoutForm'
import CartTableRow from './cart/cartTableRow'
import CartTableRedemptionRow from './cart/cartTableRedemptionRow'
import CartGrid from './cart/cartGrid'
import CartTable from './cart/cartTable'
import SuccessView from './dialogs/success'
import ErrorsDialog from './dialogs/errorsDialog'
import Loading from './form/loading'

@connect((store) => {
  return {
    affiliatePromotions: store.affiliate.promotions,
    cart: store.checkout.cart,
    clientToken: store.checkout.clientToken,
    promotionsLoaded: store.checkout.promotionsLoaded,
    redemptionCodes: store.home.redemptionCodes,
    btResponse: store.checkout.btResponse,
    promotions: store.checkout.promotions,
    viewport: store.clientLayout.viewport
  }
})
class Checkout extends React.Component {
  constructor(props){
    super(props)
    this._addToCart = this._addToCart.bind(this)
    this._submitForm = this._submitForm.bind(this)
    this._changeTmpQty = this._changeTmpQty.bind(this)
    this._removeFromCart = this._removeFromCart.bind(this)
    this._submitRedemptionForm = this._submitRedemptionForm.bind(this)
    this._showTax = this._showTax.bind(this)
    this._changeView = this._changeView.bind(this)
    this._updateQty = this._updateQty.bind(this)
    this._goToTickets = this._goToTickets.bind(this)
    this.state = {
      viewState:'cart',
      cart:[]
    }
  }

  componentWillMount(){
    let cart = this.props.cart
    this.setState({cart:cart})
    let cartIds = cart.map(
      function(item){ return item.id}
    )
    cartIds = cartIds.filter(function( element ) {
     return element !== undefined;
    })
    this.props.dispatch(actions.getPromotions())
    this.props.dispatch(actions.getCartItems(cartIds))
    this.props.dispatch(actions.getClientToken())
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.btResponse != this.props.btResponse){
      const view = nextProps.btResponse.success ? 'success' : 'errors'
      if(view === 'success'){
        this.props.dispatch(actions.updateCart([]))
        this.setState({cart:[]})
      }
      this._changeView(view)
    }
    const cart = nextProps.cart
    this.setState({cart})
  }

  _addToCart(ticket, qty=1){
    this.props.dispatch(actions.addToCart(ticket.id))
    window.scrollTo(0, 0)
  }

  _changeTmpQty(event, value){
    let cart = [...this.props.cart]
    const promotionId = parseInt(event.target.id.replace(/\D/g, ''))
    const cartPromotion = cart.find(
      function(promotion){return promotion.id === promotionId}
    )
    cartPromotion.qty = value ? parseInt(value.replace(/\D/g, '')) : 0
    this.setState({cart})
  }

  _updateQty(event, id){
    let cart = [...this.props.cart]
    for (var i = 0; i < cart.length; i++) {
      let item = cart[i]
      if(item.id === id){
        item.qty = parseInt(event.target.value)
      }
    }
    this.props.dispatch(actions.updateCart(cart))
  }

  _removeFromCart(ticketID){
    this.props.dispatch(actions.removeFromCart(ticketID))
  }

  _submitForm(payload){
    const formState = this.refs.checkoutForm.state
    let data = {
      nonce: payload.nonce,
      cart: this.props.cart
    }
    data['codes'] = this.props.redemptionCodes.map(function(r){
      return {
        id: r.id,
        code: r.code
      }
    })
    const refs = this.refs.checkoutForm.refs
    Object.keys(refs).map(function(refKey){
      const dataKey = refKey.replace('Field', '')
      data[dataKey] = refs[refKey].state.value
    })
    this.props.dispatch(actions.sendPayment(data))
  }

  _submitRedemptionForm(payload){
    const formState = this.refs.redemptionCheckoutForm.state
    const data = {
      nonce: '',
      cart: [],
      codes: this.props.redemptionCodes
    }
    const refs = this.refs.redemptionCheckoutForm.refs
    Object.keys(refs).map(function(refKey){
      const dataKey = refKey.replace('Field', '')
      data[dataKey] = refs[refKey].state.value
    })
    this.props.dispatch(actions.sendPayment(data))
  }

  _showTax(summary){
    this.setState({taxSummary:summary, showDialog:true})
  }

  _goToTickets(){
    this._changeView('cart')
    window.location = this.props.btResponse.ticket_link
  }

  _changeView(view){
    this.setState({viewState:view})
  }

  render() {
    let small = (this.props.viewport.width < 480)

    const style = {
      container: {
        width:'100%',
        maxWidth:'1600px',
        minHeight:520,
        margin:'0 auto',
        textAlign:'center'
      }
    }

    let cartTableRows = []
    for (var i = 0; i < this.props.redemptionCodes.length; i++) {
      const redemption = this.props.redemptionCodes[i]
      cartTableRows.push(
        <CartTableRedemptionRow
          key={`redemption-${redemption.code}`}
          affiliate={redemption.affiliate}
          description={redemption.description}
          price={redemption.price}
          code={redemption.code} />
      )
    }
    for (var i = 0; i < this.props.cart.length; i++) {
      const cartPromotion = this.props.cart[i]
      const promotion = this.props.promotions.find(
        function(prm){return prm.id === parseInt(cartPromotion.id)}
      )
      if(promotion){
        cartTableRows.push(
          <CartTableRow
            key={`cart-${promotion.id}`}
            showTax={this._showTax}
            updateQty={this._updateQty}
            changeTmpQty={this._changeTmpQty}
            removeFromCart={this._removeFromCart}
            cartPromotion={cartPromotion}
            promotion={promotion} />
        )
      }
    }

    let grandTotal = 0.0
    for (var i = 0; i < this.props.promotions.length; i++) {
      const newPromotion = this.props.promotions[i]
      const cartPromotion = this.props.cart.find(
        function(promotion){return promotion.id === parseInt(newPromotion.id)}
      )
      const promotionQty = cartPromotion ? cartPromotion.qty : 0
      if(
        cartPromotion &&
        [61,62].includes(cartPromotion.id) &&
        promotionQty > 0 &&
        cartPromotion.ticketData &&
        cartPromotion.ticketData.length === promotionQty
      ){
        let adAlabama = this.props.promotions.find(
          function(promotion){return promotion.id === 61}
        )
        let chAlabama = this.props.promotions.find(
          function(promotion){return promotion.id === 62}
        )
        for(let i = 0; i < promotionQty; i++){
          let adCount = parseInt(cartPromotion.ticketData[i].adultTix) || 0
          grandTotal += ((adAlabama.discounted + adAlabama.tax_total) * adCount)
          let chCount = parseInt(cartPromotion.ticketData[i].childTix) || 0
          grandTotal += ((chAlabama.discounted + chAlabama.tax_total) * chCount)
        }
        grandTotal += ((newPromotion.discounted + newPromotion.tax_total) * promotionQty)
      }else{
        grandTotal += ((newPromotion.discounted + newPromotion.tax_total) * promotionQty)
      }
    }
    if(grandTotal > 0){
      grandTotal += 1.99
    }
    grandTotal = grandTotal.toFixed(2).toString()

    let currentView
    switch (this.state.viewState) {
      case 'cart':
        currentView =
          <div>
            <CartTable
              changeView={this._changeView}
              grandTotal={grandTotal}>
              {cartTableRows}
            </CartTable>
            {this.props.affiliatePromotions.length > 0 &&
              <SectionHeader sectionTitle='More Promotions' color={deepOrange500} side='right' />}
            <br />
            <CartUpsells
              addToCart={this._addToCart}
              affiliatePromotions={this.props.affiliatePromotions} />
          </div>
        break
      case 'checkout':
        if(grandTotal === "0.00"){
          currentView =
            <RedemptionCheckoutForm
              ref='redemptionCheckoutForm'
              changeView={this._changeView}
              submitForm={this._submitRedemptionForm} />
        }else{
          currentView =
            <CheckoutForm
              ref='checkoutForm'
              total={grandTotal}
              changeView={this._changeView}
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
            changeView={this._changeView} />
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

export default Checkout
