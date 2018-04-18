import React from 'react'

const NameField = ({value, update}) => {
  return (
    <label className={'pt-label'}>
      Name:
      <input
        className={'pt-input pt-fill'}
        type={'text'}
        value={value}
        onChange={(e) => update('name', e.target.value)} />
    </label>
  )
}

export default NameField
