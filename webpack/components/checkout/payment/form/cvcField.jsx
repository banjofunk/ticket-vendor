import React from 'react'

const CvcField = ({value, onChange}) => {
  function _onChange(e){
    const name = e.target.name
    const value = e.target.value
    onChange(name, value)
  }

  return (
    <input
      type='tel'
      name='cvc'
      autoComplete='cc-csc'
      placeholder='CVC'
      value={value}
      onChange={_onChange}
    />
  )
}

export default CvcField
