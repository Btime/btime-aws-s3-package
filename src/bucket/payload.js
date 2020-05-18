'use strict'

module.exports.defineS3CreateBucketPayload = (options, params) => (
  {
    Bucket: params.name,
    CreateBucketConfiguration: {
      LocationConstraint: options.S3_REGION
    }
  }
)

module.exports.defineS3DeleteBucketPayload = (options, params) => (
  {
    Bucket: params.name
  }
)
