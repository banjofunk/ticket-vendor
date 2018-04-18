import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import classNames from 'classnames'

const LogoutButton = ({signOut}) =>
  <div className={'admin-button'}>
    <Button
      className={classNames(
        'pt-minimal',
        'pt-button'
      )}
      onClick={signOut}
    >
      <span className={classNames(
        'pt-icon-large',
        'pt-icon-log-out'
      )}/>
      <span>Logout</span>
    </Button>
  </div>

export default LogoutButton
