import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'ccdNumber'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please enter a valid card number'
  }
]

const CcdNumber = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default CcdNumber
