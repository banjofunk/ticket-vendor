import React from 'react'
require('./sectionDivider.scss')

const SectionDivider = ({ children, height, align, color}) =>{
  let style = {backgroundColor:'$md-blue-500'}
  if(color){ style.backgroundColor = color }
  if(height){ style.height = height }
  if(height){ style.maxHeight = height }
  if(align){ style.textAlign = align }
  return(
    <div
      className={'section-divider'}
      style={style}>
      {children}
    </div>
)}
export default SectionDivider
