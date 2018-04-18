import React from 'react'

const NumberField = ({value, onChange}) => {
  function _onChange(e){
    const name = e.target.name
    const value = e.target.value.replace(/ /g, '')
    onChange(name, value)
  }

  const ccdNumber = value ? value.match(/.{1,4}/g).join(' ') : ''
  return (
    <div>
      <input
        type='tel'
        name='number'
        autoComplete='cc-number'
        placeholder='Card Number'
        value={ccdNumber}
        onChange={_onChange}
      />
    </div>
  )
}

export default NumberField
