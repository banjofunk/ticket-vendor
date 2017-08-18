import React from 'react'
import { RIETextArea } from 'riek'

class PageDescription extends React.Component {
  render() {
    const style = {
      headerText:{
        color:'#414042',
        fontSize:'16px',
        lineHeight:'20px',
        fontFamily:'Arvo, serif'
      },
      mainContent:{
        textAlign:'center',
        margin:'20px auto',
        width:'80%'
      }
    }
    return(
      <div style={style.mainContent}>
        {this.props.mainText &&
          <RIETextArea
            value={this.props.mainText}
            change={this.props.updateMainText}
            style={style.headerText}
            classEditing='textEdit'
            rows={10}
            propName="textarea"
            classLoading="loading"
            classInvalid="invalid"/>
        }
      </div>
    )
  }
}

export default PageDescription
