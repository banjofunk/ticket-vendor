import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as checkoutActions from '../../checkout/actions'
import {browserHistory} from 'react-router'
import SectionHeader from '../../home/components/sectionHeader'
import { Ticket } from '../../shared/ticket'
import { Banners } from '../../shared/banners'

@connect((store) => {
  return {
    affiliate: store.affiliate.affiliate,
    banners: store.affiliate.banners,
    promotions: store.affiliate.promotions
  }
})
class Affiliate extends React.Component {
  constructor(props) {
    super(props)
    this._addToCart = this._addToCart.bind(this)
    this.state = {
      showMorePromotion: false,
      cart:[],
      promoTicket:{}
    }
  }

  componentWillMount(){
    const id = parseInt(this.props.params.id)
    this.props.dispatch(actions.getPage('about'))
    this.props.dispatch(actions.getAffiliate(id))
    this.props.dispatch(actions.getPromotions(id))
  }

  _addToCart(ticket, qty=1){
    this.props.dispatch(checkoutActions.addToCart(ticket.id))
    browserHistory.push('/checkout')
    setTimeout(window.scrollTo(0, 0), 200)
  }

  render() {

    const style = {
      backBtn:{
        width:90,
        float:'right',
        position:'relative',
        bottom:60,
        right:20
      },
      descriptionContainer:{
        width:'90%',
        maxWidth:1100,
        textAlign:'center',
        margin:'10px auto'
      },
      description:{
        whiteSpace:'pre-wrap'
      },
      logoContainer:{
        textAlign:'center',
        width:'100%'
      },
      logo:{
        width:200,
        margin:'10px auto'
      }
    }

    let promotions = []
    for (var i = 0; i < this.props.promotions.length; i++) {
      const promotion = this.props.promotions[i]
      promotions.push(
        <Ticket
          key={`ticket-${promotion['id']}`}
          addToCart={this._addToCart}
          promotion={promotion} />
      )
    }

    return(
      <div>
        <Banners banners={this.props.banners} />
        <SectionHeader
          sectionTitle={
            <span style={{marginLeft:5}}>
              {this.props.affiliate.name}
            </span>}
          side='left' />
        <div style={{clear:'both'}} />
        <div style={style.logoContainer}>
          <img style={style.logo} src={this.props.affiliate.logo} />
        </div>
        <div style={style.descriptionContainer}>
          <span style={style.description}>
            {this.props.affiliate.description}
          </span>
        </div>
        {this.props.promotions.length > 0 &&
          <div style={{textAlign:'center'}}>
            <SectionHeader
              sectionTitle="Current Promotions"
              side='right' />
            {promotions}
          </div>}
      </div>
    )
  }
}

export default Affiliate
