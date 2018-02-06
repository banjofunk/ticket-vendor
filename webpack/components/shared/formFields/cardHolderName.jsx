import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'cardHolderName'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter the name on your card'
  }
]

const CardHolderName = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default CardHolderName
