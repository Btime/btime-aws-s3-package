'use strict'

const S3UrlExists = require('s3-url-exists')
const { defineS3UrlExistsPayload } = require('./payload')
const { validateKey } = require('./validate')

module.exports.performSelectObject = function (options, params) {
  const isValid = validateKey(params)

  if (isValid.error) {
    return Promise.reject(isValid.error)
  }

  return new Promise((resolve, reject) => {
    const payload = defineS3UrlExistsPayload(options, params)

    return S3UrlExists(payload)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}
