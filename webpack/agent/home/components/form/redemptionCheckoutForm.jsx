import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { deepOrange500 } from 'material-ui/styles/colors'
import Loading from './loading'
import FirstNameField from './firstNameField'
import LastNameField from './lastNameField'
import EmailField from './emailField'
import PhoneField from './phoneField'

class RedemptionCheckoutForm extends React.Component {
  constructor(props){
    super(props)
    this._updateFormField = this._updateFormField.bind(this)
    this.state = {
      errorCount:1
    }
  }

  _updateFormField(event, newState){
    const refs = this.refs
    let newErrorCount = 0
    Object.keys(this.refs).map(
      function(key){
        const refState = refs[key].state
        const currentRef = key === `${event.target.name}Field`
        const count = currentRef ? newState.errorCount : refState.errorCount
        newErrorCount += count
      }
    )
    this.setState({errorCount:newErrorCount})
  }

  render() {
    const style = {
      checkoutContainer:{
        position:'relative',
        maxWidth:500,
        padding:10,
        margin:'20px auto',
        marginBottom:0
      },
      purchaseBtn:{
        marginTop:10,
        width:"50%"
      },
      backBtn:{
        float:'right'
      }
    }
    return(
      <div style={style.checkoutContainer}>
        <RaisedButton
          label='Back'
          labelColor='white'
          backgroundColor={deepOrange500}
          onTouchTap={()=>this.props.changeView('cart')}
          style={style.backBtn} />
        <div style={{clear:'both'}}></div>
        <form>
          <FirstNameField
            ref='firstNameField'
            updateFormField={this._updateFormField} />
          <LastNameField
            ref='lastNameField'
            updateFormField={this._updateFormField} />
          <EmailField
            ref='emailField'
            updateFormField={this._updateFormField} />
          <PhoneField
            ref='phoneField'
            updateFormField={this._updateFormField} />
          <RaisedButton
            label='Submit'
            onTouchTap={this.props.submitForm}
            disabled={this.state.errorCount > 0}
            labelColor='white'
            backgroundColor={deepOrange500}
            style={style.purchaseBtn} />
        </form>
      </div>
    )
  }
}

export default RedemptionCheckoutForm
