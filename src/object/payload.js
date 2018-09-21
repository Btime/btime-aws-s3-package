'use strict'

module.exports.defineS3Payload = function (options, params) {
  const payload = {
    Bucket: options.S3_BUCKET,
    Key: generateKey(params.key)
  }

  if (params.file) {
    payload.Body = params.file
  }

  if (params.contentType) {
    payload.ContentType = params.contentType
  }

  if (params.fileExtension) {
    payload.Key = `${payload.Key}${params.fileExtension}`
  }

  return payload
}

function generateKey (optionalKey) {
  return optionalKey || Math.random().toString(36).substr(2, 9)
}

module.exports.defineS3UrlExistsPayload = function (options, params) {
  return {
    key: params.key,
    bucket: options.S3_BUCKET,
    region: options.S3_REGION
  }
}
