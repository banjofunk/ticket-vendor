import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'phone'
const VALIDATIONS = [
  {
    regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: 'please enter a valid phone number'
  }
]

const Phone = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default Phone
