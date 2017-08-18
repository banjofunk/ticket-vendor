import React from 'react'
import { Ticket } from '../../../shared/ticket'


export class CartUpsells extends React.Component {
  render() {
    let affiliatePromotions = []
    for (var i = 0; i < this.props.affiliatePromotions.length; i++) {
      const promotion = this.props.affiliatePromotions[i]
        affiliatePromotions.push(
          <Ticket
            key={`promotion-${promotion['id']}`}
            addToCart={this.props.addToCart}
            promotion={promotion} />
        )
    }
    return (
      <div>{affiliatePromotions}</div>
    )
  }
}

export default CartUpsells
