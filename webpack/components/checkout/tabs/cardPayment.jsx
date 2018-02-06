import React from 'react'
require('./tabs.scss')

class CardPayment extends React.Component {
  render(){
    return(
      <div className={'checkout-tab'}>
        <span>Im a card payment</span>
      </div>
    )
  }

}

export default CardPayment
