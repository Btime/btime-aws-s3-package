'use strict'

const { validateCreateBucket } = require('./validate')
const { defineS3CreateBucketPayload } = require('./payload')

module.exports.performCreateBucket = function (AWS_S3, options, params) {
  const isValid = validateCreateBucket(params)

  if (isValid.error) {
    return Promise.reject(isValid.error)
  }

  return new Promise((resolve, reject) => {
    const payload = defineS3CreateBucketPayload(options, params)
    AWS_S3.createBucket(payload, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}
