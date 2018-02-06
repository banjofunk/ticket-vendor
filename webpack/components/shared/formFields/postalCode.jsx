import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'postalCode'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter the name on your card'
  }
]

const PostalCode = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default PostalCode
