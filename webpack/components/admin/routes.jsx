import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

// import { AdminLayout } from 'admin/layout'
// import { HomeManagement } from 'admin/homeManagement'
// import { TicketsManagement } from 'admin/ticketsManagement'
// import { AboutManagement } from 'admin/aboutManagement'
// import { ContactManagement } from 'admin/contactManagement'
// import { AdminAttractions } from 'admin/adminAttractions'
// import { AdminSales } from 'admin/adminSales'
// import { AdminSettings } from 'admin/adminSettings'

const AdminRoutes = () =>
  <BrowserRouter basename="/admin">
    <div>
      {/* <Route exact path='/' component={HomeManagement}/>
      <Route path='/tickets' component={TicketsManagement}/>
      <Route path='/about' component={AboutManagement}/>
      <Route path='/contact' component={ContactManagement}/>
      <Route path='/sales' component={AdminSales}/>
      <Route path='/attractions' component={AdminAttractions}/>
      <Route path='/settings' component={AdminSettings}/> */}
    </div>
  </BrowserRouter>

export default AdminRoutes
