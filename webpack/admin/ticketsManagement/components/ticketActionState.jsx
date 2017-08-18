import React from 'react'
import Toggle from 'material-ui/Toggle'

class TicketActionState extends React.Component {
  render() {
    return(
      <div>
        <Toggle
          label="Call Center"
          toggled={this.props.ticket.callCenter}
          onToggle={(e, checked)=>this.props.toggleActivateCallCenter(e, checked, this.props.ticket.id)} />
        <Toggle
          label="Active"
          toggled={this.props.ticket.active}
          onToggle={(e, checked)=>this.props.toggleActivatePromotion(e, checked, this.props.ticket.id)} />
        <Toggle
          label="Redemption"
          toggled={this.props.ticket.redemption}
          onToggle={(e, checked)=>this.props.toggleActivateRedemption(e, checked, this.props.ticket.id)} />
      </div>
    )
  }
}

export default TicketActionState
