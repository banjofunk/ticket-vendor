import React from 'react'
import TextField from 'material-ui/TextField'
import { camelCaseToWords, validate } from 'utils/string'

class DefaultTextField extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errorMessages:[]
    }
  }

  componentDidMount(){
    const { name, value, validations } = this.props
    const errorMessages = validate(value, validations)
    const errCount = errorMessages.length
    this.props.update(name, value, errCount)
  }

  _update = (event, value) => {
    const name = event.target.name
    const { validations } = this.props
    const errorMessages = validate(value, validations)
    const errCount = errorMessages.length
    this.setState({errorMessages})
    this.props.update(name, value, errCount)
  }

  render() {
    const style = {
      underlineStyle:{
        borderColor:'#DEE2E5'
      },
      textField:{
        width:'100%',
        height:60
      },
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
      }
    }
    const { name, value, update } = this.props
    const hintText = camelCaseToWords(name)

    return(
      <div className={'row'}>
        <TextField
          className='payment-input'
          name={this.props.name}
          value={value}
          errorText={this.state.errorMessages}
          onChange={this._update}
          errorStyle={style.errorStyle}
          underlineStyle={style.underlineStyle}
          underlineFocusStyle={{border:'none'}}
          style={style.textField}
          inputStyle={style.inputStyle}
          hintStyle={style.inputLabel}
          hintText={hintText} />
      </div>
    )
  }
}

export default DefaultTextField
