import React from 'react'

const PostalField = ({value, onChange}) => {
  function _onChange(e){
    const name = e.target.name
    const value = e.target.value
    onChange(name, value)
  }

  return (
    <div>
      <input
        type='tel'
        name='postal'
        autoComplete='postal-code'
        placeholder='Zip Code'
        value={value}
        onChange={_onChange}
      />
    </div>
  )
}

export default PostalField
