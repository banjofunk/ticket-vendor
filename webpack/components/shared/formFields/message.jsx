import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'message'
const VALIDATIONS = [
  {
    regex: /./,
    message: 'please leave us a message'
  }
]

const Message = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default Message
