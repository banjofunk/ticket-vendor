import React from 'react'
import * as actions from '../actions'

class AdminAttraction extends React.Component {
  render() {
    const style = {
      container:{
        display:'inline-block',
        position:'relative',
        width:'auto',
        minWidth:105,
        maxWidth:400,
        height:105,
        margin:'5px'
      },
      headerImg:{
        maxWidth:'100%',
        maxHeight:105,
        cursor:'pointer',
        verticalAlign:'middle'
      }
    }
    return(
      <div style={style.container} onTouchTap={this.props.touch}>
        <img src={this.props.attraction.logoImg} style={style.headerImg} />
      </div>
    )
  }
}

export default AdminAttraction
