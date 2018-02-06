import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'lastName'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter your last name'
  }
]

const LastName = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default LastName
