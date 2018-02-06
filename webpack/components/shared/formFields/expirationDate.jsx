import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'expirationDate'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter a valid expiration date'
  }
]

const ExpirationDate = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default ExpirationDate
