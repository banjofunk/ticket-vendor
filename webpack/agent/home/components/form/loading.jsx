import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { deepOrange500 } from 'material-ui/styles/colors';

class Loading extends React.Component {
  render() {
    const style = {
      formTop:{
        position:'relative',
        width:'100%',
        height:170
      },
      loading:{
        position:'absolute',
        bottom:0,
        width:'100%'
      },
      loadingLabel:{
        color:deepOrange500
      }
    }
    return(
      <div style={style.formTop}>
        <div style={style.loading}>
          <h1 style={style.loadingLabel}>Processing Secure Payment Form</h1>
          <br />
          <CircularProgress size={35} color={deepOrange500} />
        </div>
      </div>
    )
  }
}

export default Loading
