import React from 'react'
import { Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
require('./sectionHeader.scss')

const SectionHeader = ({side, sectionTitle, backButton=false}) =>
  <div className={'section-header'}>
    <span className={'header-text'}>
      {backButton &&
        <Link to={backButton}>
          <Button
            className={'back-button pt-minimal pt-intent-primary pt-large'}
            iconName={'pt-icon-chevron-left'}>
          </Button>
        </Link>
      }
      {sectionTitle}
    </span>
    <div className={`page-break ${side} active-side`} />
    <div className={'page-break'} />
  </div>

export default SectionHeader
