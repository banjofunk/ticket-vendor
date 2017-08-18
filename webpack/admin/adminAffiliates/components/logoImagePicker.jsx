import React from 'react'

class LogoImagePicker extends React.Component {
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
          src={this.props.logoImage.src}
          style={style.logo}
          onTouchTap={()=>this.props.logoImageSelect(this.props.logoImage)} />
      </div>
    )
  }
}

export default LogoImagePicker
