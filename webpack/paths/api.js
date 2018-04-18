import pathJoin from 'utils/pathJoin'

export function pagePath(name) {
  return pathJoin('/api', 'v1', 'pages', name )
}

export function adminAttractionPath(id) {
  return pathJoin('/api', 'v1', 'admin', 'attractions', id)
}

export function adminAttractionsPath() {
  return pathJoin('/api', 'v1', 'admin', 'attractions')
}

export function adminPromotionPath(id) {
  return pathJoin('/api', 'v1', 'admin', 'promotions', id)
}

export function adminPromotionAdmissionsPath(id, format='') {
  return pathJoin('/api', 'v1', 'admin', 'promotions', id, 'admissions' + format)
}

export function adminActivatePromotionTaxPath(id) {
  return pathJoin('/api', 'v1', 'admin', 'promotions', id, 'activate_tax')
}

export function adminTaxesPath() {
  return pathJoin('/api', 'v1', 'admin', 'taxes')
}

export function adminTaxPath(id) {
  return pathJoin('/api', 'v1', 'admin', 'taxes', id)
}

export function attractionsPath() {
  return pathJoin('/api', 'v1', 'attractions')
}

export function attractionPath(id) {
  return pathJoin('/api', 'v1', 'attractions', id)
}

export function authPath() {
  return pathJoin('/api', 'v1', 'auth', 'is_signed_in')
}

export function paymentGatewayTokenPath() {
  return pathJoin('/api', 'v1', 'payments', 'token')
}

export function paymentGatewayPaymentPath() {
  return pathJoin('/api', 'v1', 'payments', 'send_payment')
}

export function promotionsPath() {
  return pathJoin('/api', 'v1', 'promotions')
}

export function signOutPath() {
  return pathJoin('/api', 'v1', 'auth', 'sign_out')
}

export function signInPath() {
  return pathJoin('/users', 'sign_in')
}
