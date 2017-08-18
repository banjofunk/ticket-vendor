import React from 'react'

class SectionContent extends React.Component {
  render() {
    const style = {
      content: {
        overflowX: 'scroll',
        overflowY: 'hidden',
        height:this.props.height,
        margin: '5px 30px',
        whiteSpace:'nowrap'
      }
    }
    return(
      <div style={style.content} children={this.props.content} />
    )
  }
}

export default SectionContent
