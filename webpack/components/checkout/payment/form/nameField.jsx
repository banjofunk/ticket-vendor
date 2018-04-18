import React from 'react'

const NameField = ({value, onChange}) => {
  function _onChange(e){
    const name = e.target.name
    const value = e.target.value
    onChange(name, value)
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Name'
        name='name'
        autoComplete='cc-name'
        value={value}
        onChange={_onChange}
      />
    </div>
  )
}

export default NameField
