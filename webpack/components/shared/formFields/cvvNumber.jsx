import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'cvvNumber'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter a valid cvv number'
  }
]

const CvvNumber = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default CvvNumber
