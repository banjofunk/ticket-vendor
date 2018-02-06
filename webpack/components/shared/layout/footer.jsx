import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'
import { facebookIcon, twitterIcon } from 'components/shared/assets'
import { SectionDivider } from 'components/shared/layout'
require('./footer.scss')

const SvgLink = ({ to, svg }) =>
  <Link className={'scl-icon'} to={to}>
    <img src={svg} />
  </Link>

const IconLink = ({ to, icon }) =>
  <Link className={'scl-icon'} to={to}>
    <Icon className={'icon-link'} iconName={icon} />
  </Link>


const Footer = () =>
  <div className={'footer-container row'}>
    <SectionDivider height={'10px'} color={'#414142'}/>
    <div className={'footer-columns row'}>
      <div>
        <Link to='/'>
          <img className={'footer-logo'} src='/assets/logo_footer' />
        </Link>
        <div className={'scl-icons'}>
          <SvgLink svg={facebookIcon}
            to={'http://facebook.com/ticketing4less'} />
          <SvgLink svg={twitterIcon}
            to={'http://twitter.com/ticketing4less'} />
          <IconLink icon={'envelope'}
            to='http://mailto:info@vacationamenities.com?subject=Website%20Feedback' />
          <IconLink icon={'chat'}
            to='/contact' />
        </div>
      </div>
      <div className={'description'}>
        <span>
          Myrtle Beach offers plenty of fun attractions besides the beautiful beaches. In fact, you might have a hard time tearing yourself away from all the fun zip lines, go-karts, and amusement parks in town. Have fun exploring all the great attractions in Myrtle Beach.
        </span>
      </div>
      <div>
        <span className={'pt-icon pt-icon-headset'} />
        <div>
          <span>Need Help? Call Us: 7AM to 9PM Daily Central Time</span>
        </div>
        <span className={'footer-phone'}>
          (855)493-2582
        </span>
      </div>
    </div>
  </div>

export default Footer
