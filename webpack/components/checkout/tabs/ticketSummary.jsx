import React from 'react'
require('./tabs.scss')

class TicketSummary extends React.Component {
  render(){
    return(
      <div className={'checkout-tab'}>
        <span>Im a ticket summary</span>
      </div>
    )
  }

}

export default TicketSummary
