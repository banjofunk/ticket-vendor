import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import classNames from 'classnames'

const ButtonLink = ({to, text, exact=false}) =>
  <NavLink
    className={'nav-link'}
    exact={exact}
    to={to}>
    <Button className={classNames(
      'underlined',
      'navlink-button',
      {'pt-minimal':true}
    )}>
      {text}
    </Button>
  </NavLink>

export default ButtonLink
