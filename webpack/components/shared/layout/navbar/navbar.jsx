import React from 'react'

import { NavLink } from 'react-router-dom'
import { SectionDivider } from 'components/shared/layout'

import AdminForm from './adminForm'
import AdminLinks from './adminLinks'
import ButtonLink from './buttonLink'
import LogoutButton from './logoutButton'

import {
  aboutPath,
  attractionsPath,
  checkoutPath
} from 'paths/app'

require('./navbar.scss')

export class Navbar extends React.Component {
  render() {
    const { user, authError, signIn, signOut } = this.props

    const adminButton = user
      ? <LogoutButton signOut={signOut} />
      : <AdminForm user={user} signIn={signIn} />
    return (
      <div className={'navbar-container'}>
        <SectionDivider height={'45px'} align={'right'}>
          {adminButton}
        </SectionDivider>
        <SectionDivider height={'120px'} color={'white'}>
          <nav className={'main-nav'}>
            <NavLink
              to={attractionsPath()}
              className={'logo-image'}>
              <img src={'/assets/logo'} />
            </NavLink>
            <div className={'pt-navbar-group'}>
              <ButtonLink
                to={aboutPath()}
                text={'About'} />
              <ButtonLink
                to={attractionsPath()}
                text={'Attractions'}
                exact={true} />
              <ButtonLink
                to={checkoutPath()}
                text={'Checkout'}/>
              {user && <AdminLinks /> }
            </div>
          </nav>
        </SectionDivider>
      </div>
    )
  }
}

export default Navbar
