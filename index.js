'use strict'

module.exports = function BtimeAwsS3Package (options) {
  const Joi = require('joi')
  const _pick = require('lodash').pick
  const S3UrlExists = require('s3-url-exists')
  const AWS = require('aws-sdk')
  AWS.config.update({
    accessKeyId: options.S3_KEY_ID,
    secretAccessKey: options.S3_KEY_SECRET,
    region: options.S3_REGION
  })
  const AWS_S3 = new AWS.S3()
  const PICK_FIELDS = [
    'key',
    'file',
    'fileExtension',
    'contentType'
  ]

  const upload = function (params) {
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
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
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
      payload.Key = `${payload.Key}${params.fileExtension}`
    }
    return payload
  }

  function generateKey (optionalKey) {
    return optionalKey || Math.random().toString(36).substr(2, 9)
  }

  function defineS3UrlExistsPayload (params) {
    return {
      key: params.key,
      bucket: options.S3_BUCKET,
      region: options.S3_REGION
    }
  }

  function validateUpload (params) {
    const Schema = {
      key: Joi.string()
        .optional()
        .description('the key of object to create into AWS S3'),

      file: Joi.binary()
        .required()
        .description('the buffer of object to create into AWS S3'),

      fileExtension: Joi.string()
        .optional()
        .description('the extension of object to create into AWS S3'),

      contentType: Joi.string()
        .optional()
        .description('the contentType of object to create into AWS S3')
    }
    return Joi.validate(
      _pick(params, PICK_FIELDS), Schema, { abortEarly: false }
    )
  }

  function validateKey (params) {
    const Schema = {
      key: Joi.string()
        .required()
        .description('the key of object to delete/select into AWS S3')
    }
    return Joi.validate(_pick(params, PICK_FIELDS), Schema)
  }

  return {
    AWS_S3, upload, deleteObject, select
  }
}
