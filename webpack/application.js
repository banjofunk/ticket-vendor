import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Theme from 'material-ui/styles/MuiThemeProvider'
import routes from 'routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import store from './store'
import { getPromotions } from './actions/promotionActions'
import { getAttractions } from './actions/attractionActions'

store.dispatch(getPromotions())
store.dispatch(getAttractions())

import 'style/application.scss'

window.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Theme>
      <Provider store={store}>
        <Router>{routes}</Router>
      </Provider>
    </Theme>,
    document.getElementById('react-main')
  )
)
