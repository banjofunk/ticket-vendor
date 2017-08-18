import { combineReducers } from 'redux'

//CLIENT
import clientLayout from './client/layout'
import home from './client/home'
import about from './client/about'
import contact from './client/contact'
import tickets from './client/tickets'
import affiliate from './client/affiliate'
import checkout from './client/checkout'

//ADMIN
import adminLayout from './admin/layout'
import adminShared from './admin/shared'
import aboutManagement from './admin/aboutManagement'
import homeManagement from './admin/homeManagement'
import ticketsManagement from './admin/ticketsManagement'
import contactManagement from './admin/contactManagement'
import adminSales from './admin/adminSales'
import adminAffiliates from './admin/adminAffiliates'
import adminSettings from './admin/adminSettings'

//AGENT
import agentLayout from './agent/layout'
import agentHome from './agent/home'

export default combineReducers({
  clientLayout: clientLayout.reducer,
  home: home.reducer,
  tickets: tickets.reducer,
  about: about.reducer,
  contact: contact.reducer,
  affiliate: affiliate.reducer,
  checkout: checkout.reducer,
  homeManagement: homeManagement.reducer,
  ticketsManagement: ticketsManagement.reducer,
  aboutManagement: aboutManagement.reducer,
  contactManagement: contactManagement.reducer,
  adminLayout: adminLayout.reducer,
  adminShared: adminShared.reducer,
  adminSales: adminSales.reducer,
  adminAffiliates: adminAffiliates.reducer,
  adminSettings: adminSettings.reducer,
  agentLayout: agentLayout.reducer,
  agentHome: agentHome.reducer,
})
