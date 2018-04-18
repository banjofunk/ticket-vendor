import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Intent } from '@blueprintjs/core'
import { ticketsPath } from 'paths/app'

const TicketSuccess = ({ tickets }) => {
  return (
      <div>
        <h2 className={'success-header'}>Thank you for your purchase!</h2>
        <Link to={ticketsPath(tickets.access_token)} target="_blank">
          <Button intent={Intent.SUCCESS}>
            {'Click here to claim your tickets'}
          </Button>
        </Link>
        <h3 className={'success-header'}>confirmation code: {tickets.bt_id}</h3>
      </div>
  )
}

export default TicketSuccess
