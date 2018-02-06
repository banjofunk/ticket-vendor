import React from 'react'
import { Ticket } from 'components/shared'
import { Classes, Spinner, Intent } from "@blueprintjs/core"
import { SectionHeader } from 'components/shared/layout'

const SponsorsRow = ({sponsors}) => {
  const sponsorLinks = sponsors.map( sponsor =>
    <div key={`spon-${sponsor.id}`} class={'attraction-container'}>
      <img src={sponsor.logoImg} class={'attraction-header-img'} />
    </div>)

  return (
    <div className={'home-row'}>
      <SectionHeader sectionTitle="Our Sponsors" side='left' />
      <div className={'home-content'}>
        {sponsorLinks}
      </div>
    </div>
  )
}

export default SponsorsRow
