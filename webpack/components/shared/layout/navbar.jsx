import React from 'react'
import { Button, Classes } from '@blueprintjs/core'
const classNames = require('classnames')
import { NavLink } from 'react-router-dom'
import { SectionDivider } from 'components/shared/layout'
require('./navbar.scss')



const ButtonLink = ({to, text}) =>
  <NavLink className={'nav-link'} exact to={to}>
    <Button className={classNames(
      'underlined',
      'navlink-button',
      {'pt-minimal':true}
    )}>
      {text}
    </Button>
  </NavLink>


const CartButton = () =>
  <div className={'cart-button'}>
    <NavLink to={'/checkout'}>
      <button className={classNames(
        'pt-minimal',
        'pt-button'
      )}>
        <span className={classNames(
          'pt-icon-large',
          'pt-icon-shopping-cart'
        )}/>
        <span>Shopping Cart</span>
      </button>
    </NavLink>
  </div>

const Navbar = ({match}) =>
  <div className={'row'}>
    <SectionDivider height={'40px'} align={'right'}>
      <CartButton />
    </SectionDivider>
    <nav className={'main-nav'}>
      <NavLink to={'/'} className={'logo-image'}>
        <img src={'/assets/logo'} />
      </NavLink>
      <div className={'pt-navbar-group'}>
        <ButtonLink to={'/'} text={'Home'}/>
        <ButtonLink to={'/tickets'} text={'Tickets'}/>
        <ButtonLink to={'/about'} text={'About'}/>
        <ButtonLink to={'/contact'} text={'Contact'}/>
      </div>
    </nav>
  </div>

export default Navbar
