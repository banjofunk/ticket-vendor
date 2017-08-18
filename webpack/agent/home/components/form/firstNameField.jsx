import React from 'react'
import TextField from 'material-ui/TextField'

class FirstNameField extends React.Component {
  constructor(props){
    super(props)
    this._updateFormField = this._updateFormField.bind(this)
    this.state={
      errorCount:1,
      value:'',
      errorMessages:[],
      validations:[
        {
          regex:/./,
          message: 'please enter your first name'
        }
      ]
    }
  }

  _updateFormField(event, newValue){
    let newState = {...this.state}
    let errorCount = 0
    newState.errorMessages = []
    for (var i = 0; i < this.state.validations.length; i++) {
      const validation = this.state.validations[i]
      if (!newValue.match(validation.regex)) {
        errorCount += 1
        newState.errorMessages.push(validation.message)
      }
    }
    errorCount = newValue.length > 0 ? errorCount : 1
    newState.errorCount = errorCount
    newState.value = newValue
    this.setState(newState)
    this.props.updateFormField(event, newState)
  }

  render() {
    const style = {
      inputStyle:{
        padding:'0 14px 8px 14px',
        margin:'16px auto',
        fontWeight:200,
        height:30,
        boxSizing:'border-box',
        borderSpacing: 8
      },
      inputLabel:{
        marginLeft:14,
        fontWeight:100,
        fontFamily: 'Helvetica Neue,Helvetica,Arial,Sans-serif',
        fontSize:'16px',
        letterSpacing:'0.05em',
        bottom:19,
        color:'#7A838A'
      },
      errorStyle:{
        position:'absolute',
        bottom:-6,
        right:0,
        textAlign:'right'
      },
      underlineStyle:{
        borderColor:'#DEE2E5'
      }
    }
    const field = this.props.fieldProps
    return(
      <div>
        <TextField
          name='firstName'
          hintText='First Name'
          className='payment-input'
          style={{width:'100%', height:60}}
          value={this.state.value}
          onChange={this._updateFormField}
          errorText={this.state.errorMessages}
          errorStyle={style.errorStyle}
          underlineStyle={style.underlineStyle}
          underlineFocusStyle={{border:'none'}}
          inputStyle={style.inputStyle}
          hintStyle={style.inputLabel} />
      </div>
    )
  }
}

export default FirstNameField
