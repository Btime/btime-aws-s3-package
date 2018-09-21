'use strict'

module.exports = function BtimeAwsS3Package (options) {
  const AWS = require('aws-sdk')
  const { performUploadObject } = require('./src/object/upload')
  const { performSelectObject } = require('./src/object/select')
  const { performDeleteObject } = require('./src/object/delete')
  const { performCreateBucket } = require('./src/bucket/create')
  const { performDeleteBucket } = require('./src/bucket/delete')

  AWS.config.update({
    accessKeyId: options.S3_KEY_ID,
    secretAccessKey: options.S3_KEY_SECRET,
    region: options.S3_REGION
  })

  const AWS_S3 = new AWS.S3()

  const upload = async function (params) {
    return performUploadObject(AWS_S3, options, params)
  }

  const select = function (params) {
    return performSelectObject(options, params)
  }

  const deleteObject = function (params) {
    return performDeleteObject(AWS_S3, options, params)
  }

  const createBucket = async function (params) {
    return performCreateBucket(AWS_S3, options, params)
  }

  const deleteBucket = async function (params) {
    return performDeleteBucket(AWS_S3, options, params)
  }

  return {
    AWS_S3, upload, deleteObject, select, createBucket, deleteBucket
  }
}
