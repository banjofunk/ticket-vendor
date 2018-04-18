export const toPercentStr = (num) => {
  const total = num/10
  const totalStr = total ? `${total.toFixed(1)}` : '0.0'
  return totalStr
}
