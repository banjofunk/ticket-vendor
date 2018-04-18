import pathJoin from 'utils/pathJoin'

export function attractionPath(attractionId) {
  return pathJoin('/admin', 'attractions', attractionId)
}

export function attractionsPath() {
  return pathJoin('/admin', 'attractions')
}

export function newAttractionPath() {
  return pathJoin('/admin', 'new_attraction')
}

export function newAttractionPromotionPath(attractionId) {
  return pathJoin('/admin', 'attractions', attractionId, 'new_promotion')
}

export function promotionPath(promotionId) {
  return pathJoin('/admin', 'promotions', promotionId)
}

export function newPromotionTaxPath(promotionId) {
  return pathJoin('/admin', 'promotions', promotionId, 'new_tax')
}

export function promotionTaxPath(promotionId, taxId) {
  return pathJoin('/admin', 'promotions', promotionId, 'taxes', taxId)
}

export function rootPath() {
  return pathJoin('/admin')
}
