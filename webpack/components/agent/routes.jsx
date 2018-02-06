import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
// import { AgentHome } from 'agent/home'

const AgentRoutes = () =>
  <BrowserRouter basename="/agent">
    <div>
      {/* <Route path={`/:agent`} component={AgentHome}/> */}
    </div>
  </BrowserRouter>

export default AgentRoutes
