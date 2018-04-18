import React from 'react'

const TextField = ({field, value, update, name=null}) => {
  return (
    <label className={'pt-label'}>
      {name || field}
      <input
        className={'pt-input pt-fill'}
        type={'text'}
        value={value}
        onChange={(e) => update(field, e.target.value)} />
    </label>
  )
}

export default TextField
