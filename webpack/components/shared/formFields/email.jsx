import React from 'react'
import DefaultTextField from './defaultTextField'

const NAME = 'email'
const VALIDATIONS = [
  {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'please enter a valid email address'
  }
]

const Email = ({value, update}) =>
  <DefaultTextField
    name={NAME}
    value={value}
    update={update}
    validations={VALIDATIONS}/>

export default Email
