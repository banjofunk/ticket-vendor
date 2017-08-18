import React from 'react'
import { Ticket } from '../../shared/ticket'
require('../../shared/ticket/ticket.scss')

export class Promotions extends React.Component {
  render() {
    let allPromotions = []
    for (var attraction of this.props.attractions) {
      if(attraction.hasPromos){
        allPromotions.push(
          <Ticket
            key={`attPromo-${attraction.id}`}
            attraction={attraction} />
        )
      }
    }
    return (
      <div class={'section-content'} style={{height:440}}>
        {allPromotions}
      </div>
    )
  }
}

export default Promotions
