import React from 'react'
import * as actions from '../actions'
import { deepOrange500 } from 'material-ui/styles/colors';

class SectionHeader extends React.Component {
  render() {
    const style = {
      pageBreak: {
        width:'50%',
        border:'3px solid',
        borderColor: deepOrange500,
        float:this.props.side
      },
      sectionHeader: {
        fontSize: '37px',
        fontFamily:'Lato, Helvetica Neue, Arial, Helvetica, sans-serif',
        lineHeight: '43px',
        fontWeight: 500,
        textAlign:'center',
        marginTop: '30px'
      }
    }
    return(
      <div>
        <h1 style={style.sectionHeader}>{this.props.sectionTitle}</h1>
        <hr style={style.pageBreak}/>
        <div style={{clear:'both'}}/>
      </div>
    )
  }
}

export default SectionHeader
