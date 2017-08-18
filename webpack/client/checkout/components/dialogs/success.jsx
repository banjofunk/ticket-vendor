import React from 'react'
import { deepOrange500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton'

class SuccessView extends React.Component {
  render() {
    const style = {
      successContainer:{
        textAlign:'center'
      }
    }
    return(
      <div style={style.successContainer}>
        <h1>{`Thank you for your order, ${this.props.btResponse['first_name']}!`}</h1>
        <br />
        <h1>{`Your transaction id is: ${this.props.btResponse['transaction_id']}`}</h1>
        <br />
        <RaisedButton
          label='here are your tickets'
          labelColor='white'
          backgroundColor={deepOrange500}
          onTouchTap={this.props.goToTickets}
          style={{width:350, margin:'10px auto'}} />
        <br />
        <br />
        <img src='/assets/logo' style={{width:200}} />
      </div>
    )
  }
}

export default SuccessView
