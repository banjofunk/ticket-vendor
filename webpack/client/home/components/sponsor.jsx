import React from 'react'
import * as actions from '../actions'

class Sponsor extends React.Component {
  render() {
    return(
      <div class={'attraction-container'}
        onTouchTap={()=>this.props.sponsorLink(this.props.sponsor.id)}>
        <img src={this.props.sponsor.logoImg} class={'attraction-header-img'} />
      </div>
    )
  }
}

export default Sponsor
