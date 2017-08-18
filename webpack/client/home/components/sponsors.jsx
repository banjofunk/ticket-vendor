import React from 'react'
import Sponsor from './sponsor'

export class Sponsors extends React.Component {
  render() {
    let style = {}

    let sponsors = []
    for (var sponsor of this.props.sponsors) {
      sponsors.push(
        <Sponsor
          key={`sponsor-${sponsor.id}`}
          sponsor={sponsor} />
      )
    }

    return (
      <div class={'section-content'}>
        {sponsors}
      </div>
    )
  }
}

export default Sponsors
