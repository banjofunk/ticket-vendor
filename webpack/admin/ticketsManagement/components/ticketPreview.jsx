import React from 'react'
import { Ticket } from '../../../client/shared/ticket'

class TicketPreview extends React.Component {
  render() {
    return(
      <div style={{textAlign:'center'}}>
        <Ticket
          key={`ticket-${this.props.ticket ? this.props.ticket.id : 0}`}
          addToCart={()=>{alert('you are in admin mode. Go to the client or agent pages to purchase')}}
          promotion={this.props.ticket} />
      </div>
    )
  }
}

export default TicketPreview
