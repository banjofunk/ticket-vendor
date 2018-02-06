import React from 'react'
import { Ticket } from 'components/shared'
import { Spinner, Intent } from "@blueprintjs/core"
import { SectionHeader } from 'components/shared/layout'

const AttractionsRow = ({fetching, fetched, attractions}) => {

  const attractionLinks =
    fetched
      ? attractions.map( attraction =>
          <Ticket
            key={`attraction-${attraction.id}`}
            attraction={attraction}/>)
      : []

  const content =
    fetching
      ? <Spinner intent={Intent.PRIMARY} />
      : attractionLinks

  return (
    <div className={'home-row'}>
      <SectionHeader
        sectionTitle="Our Attractions"
        side='left' />
      <div className={'home-content'} height={440}>
        {content}
      </div>
    </div>
  )
}

export default AttractionsRow
