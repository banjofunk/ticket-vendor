import React from 'react'

const ExpirationDateField = ({value, onChange}) => {
  function _onChange(e){
    const name = e.target.name
    const value = e.target.value.replace(/ |\//g, '').match(/.{1,2}/g).join('/')
    onChange(name, value)
  }

  return (
    <input
      type='tel'
      name='expirationDate'
      autoComplete='cc-exp'
      placeholder='Valid Thru'
      value={value}
      onChange={_onChange}
    />
  )
}

export default ExpirationDateField
