'use strict'

const urlExists = require('../url-exists')
const { validateKey } = require('./validate')

function definePayload (options, params) {
  return {
    key: params.key,
    bucket: options.S3_BUCKET,
    region: options.S3_REGION
  }
}

module.exports.performSelectObject = function (options, params) {
  const isValid = validateKey(params)

  if (isValid.error) {
    return Promise.reject(isValid.error)
  }

  const payload = definePayload(options, params)

  return urlExists(payload)
}
