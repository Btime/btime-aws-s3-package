'use strict'

const Joi = require('@hapi/joi')
const { pick } = require('lodash')
const { UPLOAD_PICK_FIELDS, KEY_PICK_FIELDS } = require('./fields')

module.exports.validateUpload = function (params) {
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

  return Joi.validate(pick(params, UPLOAD_PICK_FIELDS), Schema, {
    abortEarly: false
  })
}

module.exports.validateKey = function (params) {
  const Schema = {
    key: Joi.string()
      .required()
      .description('the key of object to delete/select into AWS S3')
  }

  return Joi.validate(pick(params, KEY_PICK_FIELDS), Schema, {
    abortEarly: false
  })
}
