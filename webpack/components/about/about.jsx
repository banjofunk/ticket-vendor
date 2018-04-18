import React from 'react'
import { fetchJSON } from 'utils'
import { pagePath } from 'paths/api'
import { PageLayout, SectionHeader } from 'components/shared/layout'
import { Card } from '@blueprintjs/core'
import './about.scss'

const About = () => {
  return (
    <PageLayout>
      <SectionHeader sectionTitle={'About'} side='left' />
      <Card
        className={'about-card'}
        elevation={2}>
        <div className={'about-content'}>
          <h2>Ticket Vendor</h2>
          <h4>Build with Rails and React.js.</h4>
          <br />
          <p>This project was created to sell scannable tickets online. The original client acted as a go-between for various attractions in vacation destinations. As each attraction had its own ticketing system, the project supports serveral different barcode / text code formats.</p>
          <p>Ticket Vendor is a single page app that uses braintree as its payment gateway. The original project delivered tickets via text (Twilio) and email (Mandrill), but for this example, I've opted for an instant rendering.</p>
          <p>Sandbox credentials are used on the demo site and I've prepopulated any forms for convenience. In general, I tried to trim things down for this example. Keeping a 'less is more' philosophy, this should be a good representation of my work as a developer.</p>
          <p>Thank you and please enjoy the fake tickets.</p>
        </div>
      </Card>
    </PageLayout>
  )
}

export default About
