import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Dimensions from 'react-dimensions'

import { deepOrange500 } from 'material-ui/styles/colors'
require('./navbar.scss')

class Navbar extends React.Component {
  render() {
    let small = (this.props.containerWidth < 820)
    const style = {
      logoImage: {
        width:'225px'
      }
    }
    return (
      <div className={'navbar-container'}>
        <div className={'headerbar'}>
          <button className={'pt-minimal pt-button cart-button pt-success'}>
              <span className={'pt-icon-large pt-icon-shopping-cart txt-white'}/>
              <span className={'txt-white'}>Shopping Cart</span>
          </button>
        </div>
        <nav class="pt-navbar main-nav">
          <div class="pt-navbar-group pt-align-left">
            <div class="pt-navbar-heading">
              <Link to="/">
                <img src='/assets/logo' style={style.logoImage} />
              </Link>
            </div>
          </div>
          <div class="pt-navbar-group pt-align-right">
            <Link to={'/'}>
              <button class="pt-button pt-minimal pt-large">Home</button>
            </Link>
            <Link to={'/tickets'}>
              <button class="pt-button pt-minimal pt-large">Tickets</button>
            </Link>
            <Link to={'/about'}>
              <button class="pt-button pt-minimal pt-large">About</button>
            </Link>
            <Link to={'/contact'}>
              <button class="pt-button pt-minimal pt-large">Contact</button>
            </Link>
          </div>
        </nav>

      </div>
    )
  }
}

export default Dimensions()(Navbar)
