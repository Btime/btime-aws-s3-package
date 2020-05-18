const { pick } = require('lodash')
const request = require('request-promise')
const { validate } = require('./validate')

const DEFAULT_PICK_FIELDS = [
  'bucket',
  'region',
  'key'
]

const defineUri = params => `
    https://s3-${params.region}.amazonaws.com/${params.bucket}/${params.key}
  `.trim()

module.exports = function S3UrlExists (options) {
  const params = pick(options, DEFAULT_PICK_FIELDS)
  validate(params)

  const uri = defineUri(params)

  return request({
    method: 'GET',
    uri,
    resolveWithFullResponse: true
  })
    .then(response =>
      (
        {
          status: response.statusCode === 200,
          url: uri
        }
      )
    )
    .catch(errors => {
      const err = { status: false, errors }
      throw err
    })
}
