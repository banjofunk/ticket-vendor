import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as checkoutActions from '../../checkout/actions'
import { browserHistory } from 'react-router'
import SectionHeader from '../../home/components/sectionHeader'
import { Ticket } from '../../shared/ticket'
import { deepOrange500 } from 'material-ui/styles/colors';
import { Banners } from '../../shared/banners'

@connect((store) => {
  return {
    tickets: store.tickets.tickets,
    content: store.tickets.content,
    banners: store.tickets.banners
  }
})
class Tickets extends React.Component {
  constructor(props){
    super(props)
    this._addToCart = this._addToCart.bind(this)
    this.state = {
      ticket:{}
    }
  }
  componentWillMount(){
    this.props.dispatch(actions.getPage('tickets'))
    this.props.dispatch(actions.getTickets())
  }

  _addToCart(ticket){
    this.props.dispatch(checkoutActions.addToCart(ticket.id))
    this.props.dispatch(actions.getAffiliatePromotions(ticket.affiliate_id))
    browserHistory.push('/checkout')
    window.scrollTo(0, 0)
  }
  render() {
    const style = {
      container: {
        width:'100%',
        maxWidth:'1100px',
        margin:'0 auto',
        textAlign:'center'
      },
      headerText:{
        color:'#414042',
        fontSize:'16px',
        whiteSpace:'pre-wrap',
        lineHeight:'20px',
        fontFamily:'Arvo, serif'
      }
    }

    let tickets = []
    for (var ticket of this.props.tickets) {
      tickets.push(
        <Ticket
          key={`ticket-${ticket.id}`}
          addToCart={this._addToCart}
          promotion={ticket} />
      )
    }

    return(
      <div>
        <Banners banners={this.props.banners} />
        <div style={style.container}>
          <SectionHeader sectionTitle={this.props.content.titleText} color={deepOrange500} side='left' />
          <div style={{textAlign:'center', margin:'20px auto', width:'80%'}}>
            <span style={style.headerText}>{this.props.content.mainText}</span>
          </div>
          <div style={{width:'100%'}}>
            {tickets}
          </div>
        </div>
      </div>
    )
  }
}

export default Tickets
