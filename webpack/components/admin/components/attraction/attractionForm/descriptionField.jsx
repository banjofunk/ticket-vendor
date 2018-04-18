import React from 'react'

const DescriptionField = ({value, update}) => {
  return (
    <label className={'pt-label'}>
      Description:
      <textarea
        className={'pt-input pt-fill'}
        type={'text'}
        value={value}
        onChange={(e) => update('description', e.target.value)} />
    </label>
  )
}

export default DescriptionField
