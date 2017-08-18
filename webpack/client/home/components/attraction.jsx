import React from 'react'
import * as actions from '../actions'
import { browserHistory } from 'react-router'

class Attraction extends React.Component {
  constructor(props){
    super(props)
    this._attractionLink = this._attractionLink.bind(this)
  }

  _attractionLink(){
    browserHistory.push(`/affiliates/${this.props.attraction.id}`)
  }
  render() {
    return(
      <div
        class={'attraction-container'}
        onTouchTap={this._attractionLink}>
        <img src={this.props.attraction.logoImg} class={'attraction-header-img'} />
      </div>
    )
  }
}

export default Attraction
