import React from 'react'
require('./sectionHeader.scss')

const SectionHeader = ({side, sectionTitle}) =>
  <div className={'section-header'}>
    <h1>{sectionTitle}</h1>
    <div className={`page-break ${side} active-side`}/>
    <div className={'page-break'}/>
  </div>

export default SectionHeader
