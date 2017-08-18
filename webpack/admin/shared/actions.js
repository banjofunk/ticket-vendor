import * as t from '../actionTypes'

export function getAllBanners() {
  return function(dispatch) {
    fetch(`/api/admin/wide_pics`, {
      device: 'browser',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ALL_BANNERS_LOADED, payload: payload.banners})
    })
  }
}

export function onPushBanner(page, id) {
  let payload = {
    page: page,
    id: id
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch('/api/admin/wide_pics/push', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.ADD_BANNER, payload: payload.banners})
    })
  }
}

export function removeBanner(page, bannerId) {
  let payload = {
    page: page,
    id: bannerId
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch('/api/admin/wide_pics/remove', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.REMOVED_BANNER, payload: payload.banners})
    })
  }
}

export function deleteBanner(bannerId) {
  let payload = {
    id: bannerId
  }
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return function(dispatch) {
    fetch('/api/admin/wide_pics/delete', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.DELETED_BANNER, payload: payload.banners})
    })
  }
}

export function reorderBanners(banners) {
  return function(dispatch) {
    dispatch({type: t.REORDER_BANNERS, payload: banners})
  }
}

export function toggleBannerEdit(showEdit) {
  return function(dispatch) {
    dispatch({type: t.TOGGLE_BANNER_EDIT, payload: showEdit})
  }
}

export function toggleBannerAdd(showAdd) {
  return function(dispatch) {
    dispatch({type: t.TOGGLE_BANNER_ADD, payload: showAdd})
  }
}

export function bannerUploadFinished(src) {
  let payload = {
    src: src,
    kind: 'banner'
  };
  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )
  return function(dispatch) {
    fetch('/api/admin/upload/completed', {
      device: 'browser',
      credentials: 'include',
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(payload => {
      dispatch({type: t.BANNER_UPLOAD_FINISHED, payload: payload.images})
    })
  }
}

export function hideBanners(){
  return function(dispatch) {
    dispatch({type: t.TOGGLE_BANNER_EDIT, payload: true})
  }
}
