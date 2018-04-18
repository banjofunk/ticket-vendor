export const qtyToCurrencyStr = (qty, num) => {
  const total = (qty * num)/100
  const totalStr = total ? `$${total.toFixed(2)}` : '$0.00'
  return totalStr
}

export const toCurrencyStr = (num) => {
  const total = num/100
  const totalStr = total ? `$${total.toFixed(2)}` : '$0.00'
  return totalStr
}

export const toCurrency = (num) => {
  const total = num/100
  return `${total.toFixed(2)}`
}
