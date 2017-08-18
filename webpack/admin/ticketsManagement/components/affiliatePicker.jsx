import React from 'react'

class AffiliatePicker extends React.Component {
  render() {
    const style = {
      container:{
        display:'inline-block',
        width:80,
        height:80,
        lineHeight:5,
        float:'left'
      },
      logo:{
        width:'100%',
        verticalAlign:'middle',
        cursor:'pointer'
      }
    }
    return(
      <div style={style.container}>
        <img
          src={this.props.affiliate.logo}
          title={this.props.affiliate.name}
          style={style.logo}
          onTouchTap={()=>this.props.affiliateSelect(this.props.affiliate)} />
      </div>
    )
  }
}

export default AffiliatePicker
