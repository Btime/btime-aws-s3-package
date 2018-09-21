'use strict'

const { defineS3Payload } = require('./payload')
const { validateKey } = require('./validate')

module.exports.performDeleteObject = function (AWS_S3, options, params) {
  const isValid = validateKey(params)

  if (isValid.error) {
    return Promise.reject(isValid.error)
  }

  return new Promise((resolve, reject) => {
    const payload = defineS3Payload(options, params)
    AWS_S3.deleteObject(payload, (err) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        Key: payload.Key
      })
    })
  })
}
