const add = (a, b) => a + b

export const calculateTotalQty = (cart) => {
  return Object.values(cart).reduce(add)
}

export const calculateTotal = (cart, promotions) => {
  return Object.keys(cart).map(key => {
    const promotion = promotions[key]
    const qty = cart[key]
    return promotion['raw_total'] * qty
  }).reduce(add)
}
