import React from 'react'
import { Redirect, Route } from "react-router-dom"
import { PageLayout } from 'components/shared/layout'

import {
  attractionPath,
  attractionsPath,
  newAttractionPath,
  newAttractionPromotionPath,
  promotionPath,
  promotionTaxPath,
  rootPath
} from 'paths/admin'

import {
  Attractions,
  Attraction,
  NewAttraction,
  NewPromotion,
  Promotion
} from './components'

export class Admin extends React.Component {
  render() {
    return (
      <PageLayout admin>
        <Route exact
          path={rootPath()}
          component={()=><Redirect to={attractionsPath()} />}/>
        <Route exact
          path={attractionsPath()}
          component={Attractions}/>
        <Route exact
          path={attractionPath(':attractionId')}
          component={Attraction}/>
        <Route exact
          path={newAttractionPath()}
          component={NewAttraction}/>
        <Route exact
          path={newAttractionPromotionPath(':attractionId')}
          component={NewPromotion}/>
        <Route
          path={promotionPath(':promotionId')}
          component={Promotion}/>
      </PageLayout>
    )
  }
}

export default Admin
