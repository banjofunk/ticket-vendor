function fetchJSON(input, init={}) {
  init.credentials = 'include'

  if(!init.headers) {
    init.headers = {}
  }

  init.headers['Accept'] = 'application/json'

  if(init.body) {
    init.headers['Content-Type'] = 'application/json'
  }

  return fetch(input, init)
    .then(response => response.json())
}

export default fetchJSON
