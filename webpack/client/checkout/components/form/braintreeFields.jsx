import React from 'react'
import braintree from 'braintree-web'
import { DropIn } from 'braintree-react'

class BraintreeFields extends React.Component {
  render() {
    const style = {
      logoContainer:{
        backgroundColor:'white',
        width:'100%',
        height:65,
        textAlign:'center'
      },
      logo:{
        width:200
      },
      dropinContainer:{
        width:'100%',
        backgroundColor:'white'
      }

    }
    return(
      <div style={style.dropinContainer}>
        <DropIn
          braintree={braintree}
          onPaymentMethodReceived={this.props.submitForm}
          clientToken={this.props.clientToken} />
      </div>
    )
  }
}

export default BraintreeFields
