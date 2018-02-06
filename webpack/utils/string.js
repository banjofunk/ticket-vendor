export const camelCaseToWords = str =>
  str.match(/^[a-z]+|[A-Z][a-z]*/g).map(
    x => x[0].toUpperCase() + x.substr(1).toLowerCase()
  ).join(' ')

export const validate = (value, validations) =>
  validations.map(
    vad => value.match(vad.regex) ? null : vad.message
  ).filter(errMsg => errMsg !== null)
