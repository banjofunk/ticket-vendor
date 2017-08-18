import React from 'react'
import Attraction from './attraction'


export class Attractions extends React.Component {
  render() {
    let attractions = []
    for (var attraction of this.props.attractions) {
      attractions.push(
        <Attraction
          key={`attraction-${attraction.id}`}
          attraction={attraction} />
      )
    }

    return (
      <div class={'section-content'}>
        {attractions}
      </div>
    )
  }
}

export default Attractions
