import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//Client
import { ClientLayout } from './client/layout'
import { Home } from './client/home'
import { About } from './client/about'
import { Contact } from './client/contact'
import { Tickets } from './client/tickets'
import { Affiliate } from './client/affiliate'
import { Checkout } from './client/checkout'

//Agent
import { AgentLayout } from './agent/layout'
import { AgentHome } from './agent/home'

//ADMIN
import { AdminLayout } from './admin/layout'
import { HomeManagement } from './admin/homeManagement'
import { TicketsManagement } from './admin/ticketsManagement'
import { AboutManagement } from './admin/aboutManagement'
import { ContactManagement } from './admin/contactManagement'
import { AdminAffiliates } from './admin/adminAffiliates'
import { AdminSales } from './admin/adminSales'
import { AdminSettings } from './admin/adminSettings'

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('main-react-container')

  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/' name="home" component={ClientLayout}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path='/tickets' component={Tickets}/>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/affiliates/:id' component={Affiliate}/>
            <Route path='/checkout' component={Checkout}/>
          </Route>

          <Route path='/agent' component={AgentLayout}>
            <Route path='/agent/:agent' component={AgentHome}/>
          </Route>

          <Route path= '/admin' component={AdminLayout}>
            <IndexRoute component={HomeManagement}/>
            <Route path='/admin/home' component={HomeManagement}/>
            <Route path='/admin/tickets' component={TicketsManagement}/>
            <Route path='/admin/about' component={AboutManagement}/>
            <Route path='/admin/contact' component={ContactManagement}/>
            <Route path='/admin/sales' component={AdminSales}/>
            <Route path='/admin/affiliates' component={AdminAffiliates}/>
            <Route path='/admin/settings' component={AdminSettings}/>
          </Route>
        </Router>
    </Provider>
  </MuiThemeProvider>, app);
});
