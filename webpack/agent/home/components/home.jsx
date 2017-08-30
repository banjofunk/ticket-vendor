import AgentCheckout from './agentCheckout'
import AgentDialog from './dialogs/agentDialog'
import AlabamaTheaterForm from './dialogs/alabamaTheaterForm'
import { connect } from 'react-redux'
import { deepOrange500 } from 'material-ui/styles/colors'
import * as actions from '../actions'
import CartTable from './cart/cartTable'
import CartTableRow from './cart/cartTableRow'
import CartTableRedemptionRow from './cart/cartTableRedemptionRow'
import CcsHeader from './ccsHeader'
import { Cookies } from 'react-cookie'
import PromotionsTable from './promotions/promotionsTable'
import PromotionsTableRow from './promotions/promotionsTableRow'
import React from 'react'
import SectionDivider from './sectionDivider'
import SectionHeader from './sectionHeader'
import TaxDialog from './dialogs/taxDialog'
import RedemptionSelection from './dialogs/redemptionSelection'

@connect((store) => {
  return {
    clientToken: store.agentHome.clientToken,
    clearCookie: store.agentHome.clearCookie,
    btResponse: store.agentHome.btResponse,
    redemptionCodes: store.agentHome.redemptionCodes,
    redemptionSelection: store.agentHome.redemptionSelection,
    promotions: store.agentHome.promotions
  }
})
class Home extends React.Component {
  static propTypes = {
    cookies: new Cookies()
  }
  constructor(props) {
    super(props)
    this._loadHomePage()
    this._addToCart = this._addToCart.bind(this)
    this._closeAlabamaDialog = this._closeAlabamaDialog.bind(this)
    this._changeFilter = this._changeFilter.bind(this)
    this._changePromotionQty = this._changePromotionQty.bind(this)
    this._changeRedemption = this._changeRedemption.bind(this)
    this._changeTmpQty = this._changeTmpQty.bind(this)
    this._changeView = this._changeView.bind(this)
    this._closeDialog = this._closeDialog.bind(this)
    this._closeRedemptionDialog = this._closeRedemptionDialog.bind(this)
    this._removeFromCart = this._removeFromCart.bind(this)
    this._removeRedemption = this._removeRedemption.bind(this)
    this._sendPayment = this._sendPayment.bind(this)
    this._showTax = this._showTax.bind(this)
    this._submitAlabamaForm = this._submitAlabamaForm.bind(this)
    this._submitRedemption = this._submitRedemption.bind(this)
    this._selectRedemption = this._selectRedemption.bind(this)
    this._updateQty = this._updateQty.bind(this)
    this._updateRedemption = this._updateRedemption.bind(this)
    this.state = {
      showMorePromotion: false,
      cart:[],
      agent:'',
      ticketId:'',
      promotion:{},
      promotionQty:{},
      redemptionValue:'',
      showRedemptionSelection:false,
      taxSummary:'',
      showDialog:false,
      showAlabamaDialog:false,
      filteredPromotions: props.promotions,
      filterValue: '',
      viewState: 'cart'
    }
  }
  componentWillMount(){
    let cartCookie = cookies.get('cartCookie')
    let cart = Array.isArray(cartCookie) ? cartCookie : []
    this.setState({cart})
    this.props.dispatch(actions.getClientToken())
  }

  componentDidMount(){
    const ticketId = this.props.params.ticketId
    const agent = this.props.params.agent
    const showAgentDialog = agent === "ccs" ? true : false
    this.setState({agent, showAgentDialog, ticketId})
  }

  componentWillReceiveProps(nextProps){
    if(this.props.promotions !== nextProps.promotions){
      let promotionQty = {...this.state.promotionQty}
      nextProps.promotions.map(function(promo){
        if(!promotionQty[promo.id]){
          promotionQty[promo.id] = 1
        }
      })
      this.setState({promotionQty})
    }
    if(nextProps.btResponse != this.props.btResponse){
      const view = nextProps.btResponse.success ? 'success' : 'errors'
      if(view === 'success'){
        this.setState({cart:[]})
      }
      this._changeView(view)
    }
    if(nextProps.redemptionCodes != this.props.redemptionCodes){
      let redemptionValue
      if(nextProps.redemptionCodes.length === this.props.redemptionCodes.length &&
        nextProps.redemptionSelection.length === 0){
        redemptionValue = 'INVALID'
      }else{
        redemptionValue = ''
      }
      this.setState({redemptionValue})
    }
    if(nextProps.redemptionSelection.length > 0){
      this.setState({showRedemptionSelection:true})
    }
    if(nextProps.clearCookie){
      cookies.set('cartCookie', [], {path: '/'})
      this.props.dispatch(actions.checkoutCookieReset())
    }
  }

  _closeAlabamaDialog(){
    this.setState({showAlabamaDialog:false})
  }

  _loadHomePage(){
    this.props.dispatch(actions.getPromotions())
    this.props.dispatch(actions.getClientToken())
  }

  _submitAlabamaForm(cart) {
    this.setState({
      cart,
      viewState:'checkout',
      showAlabamaDialog:false
    })
  }

  _submitRedemption() {
    const rCodes = this.props.redemptionCodes.map(function(r){return r.code})
    if(rCodes.indexOf(this.state.redemptionValue) < 0){
      this.props.dispatch(
        actions.submitRedemption(this.state.redemptionValue)
      )
    }else{
      this.setState({redemptionValue:''})
    }
  }

  _updateRedemption(event) {
    this.props.dispatch(
      actions.updateRedemption(event.target.value)
    )
  }

  _addToCart(promotion, qty=1){
    let promotionQty = {...this.state.promotionQty}
    let cartCookie = cookies.get('cartCookie')
    let cart = Array.isArray(cartCookie) ? cartCookie : []
    const cartIds = cart.map(function(e){return e.id})
    const promoIdx = cartIds.indexOf(promotion.id)
    if(promoIdx < 0){
      cart.unshift({id:promotion.id, qty:qty})
    }else{
      cart[promoIdx].qty = cart[promoIdx].qty + qty
    }
    promotionQty[promotion.id] = 1
    this.setState({cart, promotionQty})
    cookies.set('cartCookie', cart, { path: '/' })
    this.props.dispatch(actions.addToCart(promotion.id))
  }

  _removeFromCart(promoId){
    let cart = [...this.state.cart]
    let promotion = cart.filter(
      function ( promo ) {
        return promo.id === promoId
      })[0]
    const i = cart.indexOf(promotion)
    if(i != -1){
      cart.splice(i, 1)
      this.setState({cart:cart})
      cookies.set('cartCookie', cart, {path:'/'})
    }
  }

  _removeRedemption(promoId){
    let codes = [...this.props.redemptionCodes]
    let promotion = codes.filter(
      function ( promo ) {
        return promo.id === promoId
      })[0]
    const i = codes.indexOf(promotion)
    if(i != -1){
      codes.splice(i, 1)
      this.props.dispatch(actions.removeRedemption(codes))
    }
  }

  _sendPayment(data){
    data['ticketId'] = this.state.ticketId
    data['agent'] = this.state.agent
    data['codes'] = this.props.redemptionCodes.map(function(r){
      return {
        id: r.id,
        code: r.code
      }
    })
    this.props.dispatch(actions.sendPayment(data))
  }

  _changeTmpQty(event, value){
    let cart = [...this.state.cart]
    const promotionId = parseInt(event.target.id.replace(/\D/g, ''))
    const cartPromotion = cart.find(
      function(promotion){return promotion.id === promotionId}
    )
    cartPromotion.qty = value ? parseInt(value.replace(/\D/g, '')) : 0
    this.setState({cart})
  }

  _changePromotionQty(event, value){
    let promotionQty = {...this.state.promotionQty}
    const promotionId = parseInt(event.target.id.replace(/\D/g, ''))
    promotionQty[promotionId] = value ? parseInt(value.replace(/\D/g, '')) : 0
    this.setState({promotionQty})
  }

  _updateQty(event, id){
    let newState = {...this.state}
    const cartPromotion = newState.cart.find(
      function(promotion){
        return promotion.id === id
      }
    )
    cartPromotion.qty = parseInt(event.target.value)
    this.setState(newState)
    cookies.set('cartCookie', newState.cart, {path:'/'})
  }

  _closeDialog(){
    this.setState({showDialog:false})
  }

  _closeRedemptionDialog(){
    this.setState({showRedemptionSelection:false})
    this.props.dispatch(
      actions.clearRedemptionSelection()
    )
  }

  _selectRedemption(redemption){
    this.props.dispatch(
      actions.selectRedemption(redemption)
    )
    if(this.props.redemptionSelection.length < 5){
      this._closeRedemptionDialog()
    }
  }

  _changeView(viewState){
    if(viewState === 'checkout'){
      let cart = [...this.state.cart]
      let needsData = false
      let tickets = cart.filter(function( obj ) {
        return [61, 62].includes(obj.id)
      })[0]
      if(tickets){
        if(
          tickets['ticketData'] === undefined ||
          tickets['ticketData'].length < tickets.qty
        ){
          this.setState({showAlabamaDialog:true})
        }else{
          this.setState({viewState, cart})
        }
      }else{
        this.setState({viewState, cart})
      }
    }else{
      this.setState({viewState})
    }
  }

  _showTax(summary){
    this.setState({taxSummary:summary, showDialog:true})
  }

  _changeFilter(event, filterValue){
    this.setState({filterValue})
  }

  _changeRedemption(event, redemptionValue){
    this.setState({redemptionValue})
  }

  render() {
    const filteredPromotions = this.props.promotions.filter((promo) => (
      promo.affiliate.match(new RegExp(this.state.filterValue, "i")) ||
      promo.shortDescription.match(new RegExp(this.state.filterValue, "i"))
    ))

    let taxSummary = []
    for (var i = 0; i < this.state.taxSummary.length; i++) {
      const summaryItem = this.state.taxSummary[i]
      taxSummary.push(<h1 key={`taxSummary-${i}`}>{summaryItem}</h1>)
    }

    let grandTotal = 0.0
    for (var i = 0; i < this.props.promotions.length; i++) {
      const newPromotion = this.props.promotions[i]
      const cartPromotion = this.state.cart.find(
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
          const adCount = parseInt(cartPromotion.ticketData[i].adultTix) || 0
          grandTotal += ((adAlabama.discounted + adAlabama.tax_total) * adCount)
          const chCount = parseInt(cartPromotion.ticketData[i].childTix) || 0
          let adjustedChildren = chCount - adCount
          adjustedChildren = adjustedChildren < 0 ? 0 : adjustedChildren
          grandTotal += ((chAlabama.discounted + chAlabama.tax_total) * adjustedChildren)
        }
      }else{
        grandTotal += ((newPromotion.discounted + newPromotion.tax_total) * promotionQty)
      }
    }
    if(grandTotal > 0){
      grandTotal += 1.99
    }
    grandTotal = grandTotal.toFixed(2).toString()

    const style = {
      container: {
        width:'100%',
        margin:'0 auto',
        textAlign:'center'
      }
    }

    let cartTableRows = []
    for (var i = 0; i < this.props.redemptionCodes.length; i++) {
      const redemption = this.props.redemptionCodes[i]
      cartTableRows.push(
        <CartTableRedemptionRow
          key={`redemption-${redemption.code + i}`}
          affiliate={redemption.affiliate}
          id={redemption.id}
          description={redemption.description}
          removeRedemption={this._removeRedemption}
          price={redemption.price}
          code={redemption.code} />
      )
    }
    for (var i = 0; i < this.props.promotions.length; i++) {
      const promotion = this.props.promotions[i]
      const cartPromotion = this.state.cart.find(
        function(prm){return prm.id === parseInt(promotion.id)}
      )
      if(cartPromotion){
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

    let promotionsTableRows = []
    for (var i = 0; i < filteredPromotions.length; i++) {
      const promotion = filteredPromotions[i]
      const promotionQty = this.state.promotionQty[promotion.id]
      promotionsTableRows.push(
        <PromotionsTableRow
          key={`promotion-${promotion.id}`}
          showTax={this._showTax}
          changePromotionQty={this._changePromotionQty}
          addToCart={this._addToCart}
          promotionQty={promotionQty}
          promotion={promotion} />
      )
    }

    let currentView
    switch (this.state.viewState) {
      case 'cart':
        currentView =
          <div style={style.container}>
            <SectionDivider height="60px" color={deepOrange500} />
            <CcsHeader
              changeFilter={this._changeFilter}
              filterValue={this.state.filterValue}
              submitRedemption={this._submitRedemption}
              changeRedemption={this._changeRedemption}
              redemptionValue={this.state.redemptionValue} />
            <SectionDivider height="25px" color={deepOrange500} />
            <SectionHeader sectionTitle="Cart" color={deepOrange500} side='left' />
            <br />
            <CartTable
              changeView={this._changeView}
              grandTotal={grandTotal}
              children={cartTableRows} />
            <SectionHeader sectionTitle="Promotions" color={deepOrange500} side='right' />
            <br />
            <PromotionsTable children={promotionsTableRows} />
            <TaxDialog
              showDialog={this.state.showDialog}
              closeDialog={this._closeDialog}>
              {taxSummary}
            </TaxDialog>
            <RedemptionSelection
              showRedemptionSelection={this.state.showRedemptionSelection}
              selectRedemption={this._selectRedemption}
              redemptions={this.props.redemptionSelection}
              closeDialog={this._closeRedemptionDialog} />
            <AlabamaTheaterForm
              cart={this.state.cart}
              closeDialog={this._closeAlabamaDialog}
              openDialog={this.state.showAlabamaDialog}
              submitForm={this._submitAlabamaForm} />
          </div>
        break
      default:
        currentView =
          <AgentCheckout
            grandTotal={grandTotal}
            viewState={this.state.viewState}
            btResponse={this.props.btResponse}
            sendPayment={this._sendPayment}
            changeView={this._changeView}
            submitForm={this._submitForm}
            clientToken={this.props.clientToken} />
        break
    }

    return(
      <div>
        {currentView}
        <AgentDialog open={this.state.showAgentDialog} />
      </div>
    )
  }
}

export default Home
