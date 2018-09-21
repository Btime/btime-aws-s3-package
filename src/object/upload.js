'use strict'

const { defineS3Payload } = require('./payload')
const { validateUpload } = require('./validate')

module.exports.performUploadObject = function (AWS_S3, options, params) {
  const isValid = validateUpload(params)

  if (isValid.error) {
    return Promise.reject(isValid.error)
  }

  return new Promise((resolve, reject) => {
    const payload = defineS3Payload(options, params)
    AWS_S3.upload(payload, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}
