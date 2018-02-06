import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Attraction } from './attraction'

const AttractionRoutes = () =>
  <BrowserRouter basename="/attractions">
    <div>
      <Route path='/:id' component={Attraction} />
    </div>
  </BrowserRouter>

export default AttractionRoutes
