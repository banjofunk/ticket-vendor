import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ErrorsDialog extends React.Component {
  render() {
    const style = {
      errorsContainer:{
        textAlign:'left'
      }
    }
    let errorsView = []
    for (var i = 0; i < this.props.btResponse.errors.length; i++) {
      const error = this.props.btResponse.errors[i]
      const errorText = `${error.message} (code: ${error.code})`
      errorsView.push(<h2 key={`error-${i}`} style={{color:'red'}}>{errorText}</h2>)
    }
    return(
      <div>
        <Dialog
          modal={false}
          open={true}
          autoScrollBodyContent={true}
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={()=>this.props.changeView('checkout')}
            />
          ]}
          onRequestClose={()=>this.props.changeView('checkout')}>
          <div style={style.errorsContainer}>
            <h1>Looks like there was a problem:</h1>
            <br />
            {errorsView}
          </div>
        </Dialog>
      </div>
    )
  }
}

export default ErrorsDialog
