import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@blueprintjs/core'
import { attractionPath } from 'paths/app'

const Attraction = ({attraction}) => {
  return (
    <Card
      className={'attraction-card'}
      interactive={true}
      elevation={1}>
      <Link className={'attraction-container'}
        to={attractionPath(attraction.id)} >

        <img className={'header-img'}
          src={attraction.attraction_image} />

        <div className={'title'}>
          <span className={'title-text'}>
            {attraction.name}
          </span>
        </div>

        <div className={'logo-container'}>
          <img className={'logo'} src={attraction.logo} />
        </div>
      </Link>
    </Card>
  )
}

export default Attraction
