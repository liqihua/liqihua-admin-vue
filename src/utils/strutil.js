export function makeParam(data) {
  if (data && typeof (data) === 'object') {
    let params = ''
    for (var key in data) {
      if (typeof (data[key]) !== 'boolean' && !data[key]) {
        data[key] = ''
      }
      params += (key + '=' + data[key] + '&')
    }
    return params
  }
}
