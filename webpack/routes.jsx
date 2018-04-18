import React from 'react'
import { Route } from 'react-router-dom'

import {
  aboutPath,
  adminPath,
  attractionPath,
  attractionsPath,
  checkoutPath
} from 'paths/app'

import {
  About,
  Admin,
  Attraction,
  Attractions,
  Checkout
} from 'components'


const routes =
  <div>
    <Route exact
      path={attractionsPath()}
      component={Attractions}/>
    <Route exact
      path={aboutPath()}
      component={About}/>
    <Route
      path={checkoutPath()}
      component={Checkout}/>
    <Route exact
      path={attractionPath(':attractionId')}
      component={Attraction}/>
    <Route
      path={adminPath()}
      component={Admin} />
  </div>

export default routes
