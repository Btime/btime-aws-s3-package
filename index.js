'use strict'

const AWS = require('aws-sdk')
const { performUploadObject } = require('./src/object/upload')
const { performSelectObject } = require('./src/object/select')
const { performDeleteObject } = require('./src/object/delete')
const { performCreateBucket } = require('./src/bucket/create')
const { performDeleteBucket } = require('./src/bucket/delete')

const upload = (AWS_S3, options) => params => performUploadObject(AWS_S3, options, params)

const select = options => params => performSelectObject(options, params)

const deleteObject = (AWS_S3, options) => params => performDeleteObject(AWS_S3, options, params)

const createBucket = (AWS_S3, options) => params => performCreateBucket(AWS_S3, options, params)

const deleteBucket = (AWS_S3, options) => params => performDeleteBucket(AWS_S3, options, params)

module.exports = function BtimeAwsS3Package (options) {
  AWS.config.update({
    accessKeyId: options.S3_KEY_ID,
    secretAccessKey: options.S3_KEY_SECRET,
    region: options.S3_REGION
  })

  const AWS_S3 = new AWS.S3()

  return {
    AWS_S3,
    upload: upload(AWS_S3, options),
    deleteObject: deleteObject(AWS_S3, options),
    select: select(options),
    createBucket: createBucket(AWS_S3, options),
    deleteBucket: deleteBucket(AWS_S3, options)
  }
}
