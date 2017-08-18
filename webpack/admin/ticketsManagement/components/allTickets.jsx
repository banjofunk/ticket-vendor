import React from 'react'
import { Ticket } from '../../../client/shared/ticket'

class AllTickets extends React.Component {

  render() {
    let tickets = []
    if(this.props.tickets.length > 0){
      for (var ticket of this.props.tickets) {
        const key = this.props.tickets.indexOf(ticket)
        tickets.push(
          <Ticket
            key={`ticket-${key}`}
            addToCart={this.props.addToCart}
            promotion={ticket} />
        )
      }
    }

    return(
      <div>
        {tickets}
      </div>
    )
  }
}

export default AllTickets
