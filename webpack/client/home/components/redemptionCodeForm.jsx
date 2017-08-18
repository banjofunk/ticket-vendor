import React from 'react'
import * as actions from '../actions'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { deepOrange500 } from 'material-ui/styles/colors';

class RedemptionCodeForm extends React.Component {
  render() {
    const style = {
      container:{
        width:'100%',
        textAlign:'center',
        paddingTop:'30px'
      },
      textField:{
        fontSize: '22px',
        lineHeight: '28px',
        minWidth:'60%',
        color: '#000',
        border: '1px solid #b2b4b6',
        padding: "12px 21px",
        margin:'5px',
        borderRadius: 0,
        fontFamily: 'Arvo,serif'
      },
      submitButton:{
        height:'54px',
        position:'relative',
        bottom:'1px'
      },
      submitButtonLabel: {
        fontSize:'18px'
      }
    }
    const callback = this.props.redemptionCallbacks
    return(
      <div style={style.container}>
        <h2>*Enter your code below for additional savings on selected Hotels & Resorts</h2>
        <input
          placeholder="Enter Your Code"
          style={style.textField}
          value={this.props.redemptionValue}
          onChange={this.props.changeRedemption} />
        <RaisedButton
          label='Claim'
          labelColor='white'
          labelStyle={style.submitButtonLabel}
          buttonStyle={style.submitButton}
          backgroundColor={deepOrange500}
          onTouchTap={this.props.submitRedemption} />
      </div>
    )
  }
}

export default RedemptionCodeForm
