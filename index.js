'use strict'

module.exports = function BtimeAwsS3Package (options) {
  const AWS = require('aws-sdk')
  const S3UrlExists = require('s3-url-exists')
  const { validateUpload, validateKey } = require('./validate')

  AWS.config.update({
    accessKeyId: options.S3_KEY_ID,
    secretAccessKey: options.S3_KEY_SECRET,
    region: options.S3_REGION
  })

  const AWS_S3 = new AWS.S3()

  const upload = async function (params) {
    const isValid = validateUpload(params)

    if (isValid.error) {
      return Promise.reject(isValid.error)
    }

    return new Promise((resolve, reject) => {
      const payload = defineS3Payload(params)
      AWS_S3.upload(payload, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }

  const select = function (params) {
    const isValid = validateKey(params)

    if (isValid.error) {
      return Promise.reject(isValid.error)
    }

    return new Promise((resolve, reject) => {
      const payload = defineS3UrlExistsPayload(params)
      return S3UrlExists(payload)
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
  }

  function defineS3UrlExistsPayload (params) {
    return {
      key: params.key,
      bucket: options.S3_BUCKET,
      region: options.S3_REGION
    }
  }

  const deleteObject = function (params) {
    const isValid = validateKey(params)

    if (isValid.error) {
      return Promise.reject(isValid.error)
    }

    return new Promise((resolve, reject) => {
      const payload = defineS3Payload(params)
      AWS_S3.deleteObject(payload, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve({ Key: payload.Key })
      })
    })
  }

  function defineS3Payload (params) {
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

  return {
    AWS_S3, upload, deleteObject, select
  }
}
