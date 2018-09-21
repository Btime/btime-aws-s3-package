'use strict'

const { validateDeleteBucket } = require('./validate')
const { defineS3DeleteBucketPayload } = require('./payload')

module.exports.performDeleteBucket = function (AWS_S3, options, params) {
  const isValid = validateDeleteBucket(params)

  if (isValid.error) {
    return Promise.reject(isValid.error)
  }

  return new Promise((resolve, reject) => {
    const payload = defineS3DeleteBucketPayload(options, params)
    AWS_S3.deleteBucket(payload, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}
