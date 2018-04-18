import React from 'react'
import ButtonLink from './buttonLink'
import { attractionsPath } from 'paths/admin'


const AdminLinks = () => {
  return (
    <div>
      <ButtonLink to={attractionsPath()} text={'Admin'}/>
    </div>
  )
}

export default AdminLinks
