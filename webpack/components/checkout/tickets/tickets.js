import React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import TicketSuccess from './ticketSuccess'

import './tickets.scss'

const Tickets = ({ cart, tickets }) => {
  if(Object.keys(cart).length !== 0){
    return (
      <NonIdealState
        visual="error"
        title="purchase the items in your cart" />
    )
  }
  if(!tickets){
    return (
      <NonIdealState
        visual="error"
        title="no tickets have been purchased" />
    )
  }
  return (
    <TicketSuccess tickets={tickets} />
  )
}

export default Tickets
