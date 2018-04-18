import pathJoin from 'utils/pathJoin'

export function aboutPath() {
  return pathJoin('/about')
}

export function adminPath() {
  return pathJoin('/admin')
}

export function attractionPath(attractionId) {
  return pathJoin('/attractions', attractionId)
}

export function attractionsPath() {
  return pathJoin('/')
}

export function checkoutPath(step='') {
  return pathJoin('/checkout', step)
}

export function ticketsPath(token) {
  return pathJoin('/t', token)
}
