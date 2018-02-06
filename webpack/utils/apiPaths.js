import pathJoin from 'utils/pathJoin'

export function pagePath(name) {
  return pathJoin('/api', 'v1', 'pages', name )
}

export function attractionsPath() {
  return pathJoin('/api', 'v1', 'attractions')
}

export function paymentGatewayTokenPath() {
  return pathJoin('/api', 'v1', 'payments', 'client_token')
}

export function paymentGatewayPaymentPath() {
  return pathJoin('/api', 'v1', 'payments', 'send_payment')
}

export function promotionsPath() {
  return pathJoin('/api', 'v1', 'promotions')
}
