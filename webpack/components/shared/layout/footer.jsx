import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'
import { SectionDivider } from 'components/shared/layout'
require('./footer.scss')

import fontawesome from '@fortawesome/fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faComments from '@fortawesome/fontawesome-free-solid/faComments'
import faFacebookF from '@fortawesome/fontawesome-free-brands/faFacebookF'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
fontawesome.library.add(faFacebookF)
fontawesome.library.add(faTwitter)
fontawesome.library.add(faComments)
fontawesome.library.add(faEnvelope)

const Footer = () =>
  <div className={'footer-container'}>
    <SectionDivider height={'10px'} color={'#414142'}/>
    <div className={'footer-columns'}>
      <div>
        <Link to='/'>
          <img className={'footer-logo'} src='/assets/logo_footer' />
        </Link>
        <div className={'scl-icons'}>
          <Link className={'scl-icon'} to={'/'}>
            <i class="fab fa-facebook-f icon"></i>
          </Link>
          <Link className={'scl-icon'} to={'/'}>
            <i class="fab fa-twitter icon"></i>
          </Link>
          <Link className={'scl-icon'} to={'/'}>
            <i class="fas fa-envelope icon"></i>
          </Link>
          <Link className={'scl-icon'} to={'/'}>
            <i class="fas fa-comments icon"></i>
          </Link>
        </div>
      </div>
      <div className={'description'}>
        <span>
          Ticket Vendor is your online source for the best deals on fun and excitement for your vacation!
        </span>
      </div>
      <div>
        <span className={'pt-icon pt-icon-headset'} />
        <div>
          <span>Need help? Give us a call:</span>
        </div>
        <span className={'footer-phone'}>
          (888)888-8888
        </span>
      </div>
    </div>
  </div>

export default Footer
