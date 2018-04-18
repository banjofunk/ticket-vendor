import React from 'react'
import { CurrencyField, PercentField } from 'components/shared/form'

const AmountField = ({kind, update, value}) => {
  if(kind===1){
    return(
      <CurrencyField
        field={'amount'}
        value={value}
        update={update} />
    )
  }
  return (
    <PercentField
      field={'amount'}
      value={value}
      update={update} />
  )
}

export default AmountField
