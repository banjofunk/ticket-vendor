import React from 'react'
import withSizes from 'react-sizes'
import AffiliateTicket from './components/affiliateTicket'
import SmallTicket from './components/smallTicket'
import LargeTicket from './components/largeTicket'

require('./ticket.scss')

@withSizes(({ width }) => ({ isMobile: width < 480 }))
class Ticket extends React.Component {
  render() {
    let ticket
    if(this.props.attraction){
      ticket =
        <AffiliateTicket
          attraction={this.props.attraction} />
    }
    if(this.props.promotion && this.props.isMobile){
      ticket =
        <SmallTicket
          addToCart={this.props.addToCart}
          promotion={this.props.promotion} />
    }
    if(this.props.promotion && !this.props.isMobile){
      ticket =
        <LargeTicket
          addToCart={this.props.addToCart}
          promotion={this.props.promotion} />
    }
    return(ticket)
  }
}

export default Ticket
