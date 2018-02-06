import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import { Home } from 'components/home'
import { About } from 'components/about'
import { Checkout } from 'components/checkout'
import { Contact } from 'components/contact'
import { Tickets } from 'components/tickets'
import { AdminRoutes } from 'components/admin'
import { Attraction } from 'components/attraction'
import { AgentRoutes } from 'components/agent'

const routes =
  <div>
    <Route exact path='/' component={Home}/>
    <Route path='/tickets' component={Tickets}/>
    <Route path='/about' component={About}/>
    <Route path='/contact' component={Contact}/>
    <Route path='/checkout' component={Checkout}/>
    <Route path='/attractions/:id' component={Attraction}/>
    <Route path='/agent' component={AgentRoutes}/>
    <Route path='/admin' component={AdminRoutes}/>
  </div>

export default routes
