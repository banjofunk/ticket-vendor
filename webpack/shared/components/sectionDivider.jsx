import React from 'react'
import * as actions from '../actions'

class SectionDivider extends React.Component {
  render() {
    const style = {
      divider: {
        width:'100%',
        height:this.props.height,
        backgroundColor:this.props.color
      }
    }
    return(
      <div style={style.divider} />
    )
  }
}

export default SectionDivider
