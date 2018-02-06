import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'firstName'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter your first name'
  }
]

const FirstName = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default FirstName
