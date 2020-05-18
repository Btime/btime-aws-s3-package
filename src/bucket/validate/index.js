'use strict'

const Joi = require('@hapi/joi')
const { pick } = require('lodash')
const { CREATE_PICK_FIELDS, DELETE_PICK_FIELDS } = require('./fields')

module.exports.validateCreateBucket = function (params) {
  const Schema = {
    name: Joi.string()
      .required()
      .description('the name of a new bucket')
  }

  return Joi.validate(pick(params, CREATE_PICK_FIELDS), Schema, {
    abortEarly: false
  })
}

module.exports.validateDeleteBucket = function (params) {
  const Schema = {
    name: Joi.string()
      .required()
      .description('the name of bucket to delete')
  }

  return Joi.validate(pick(params, DELETE_PICK_FIELDS), Schema, {
    abortEarly: false
  })
}
