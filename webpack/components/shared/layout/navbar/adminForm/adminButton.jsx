import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import classNames from 'classnames'

const AdminButton = ({ toggleForm }) =>
  <div className={'admin-button'}>
    <Button
      className={classNames(
        'pt-minimal',
        'pt-button'
      )}
      onClick={toggleForm}>
      <span className={classNames(
        'pt-icon-large',
        'pt-icon-user'
      )}/>
      <span>Admin</span>
    </Button>
  </div>

export default AdminButton
