'use strict'

module.exports.defineS3CreateBucketPayload = function (options, params) {
  return {
    Bucket: params.name,
    CreateBucketConfiguration: {
      LocationConstraint: options.S3_REGION
    }
  }
}

module.exports.defineS3DeleteBucketPayload = function (options, params) {
  return {
    Bucket: params.name
  }
}
