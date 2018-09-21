'use strict'

const Joi = require('joi')
const _pick = require('lodash').pick
const { CREATE_PICK_FIELDS, DELETE_PICK_FIELDS } = require('./fields')

module.exports.validateCreateBucket = function (params) {
  const Schema = {
    name: Joi.string()
      .required()
      .description('the name of a new bucket')
  }

  return Joi.validate(_pick(params, CREATE_PICK_FIELDS), Schema, {
    abortEarly: false
  })
}

module.exports.validateDeleteBucket = function (params) {
  const Schema = {
    name: Joi.string()
      .required()
      .description('the name of bucket to delete')
  }

  return Joi.validate(_pick(params, DELETE_PICK_FIELDS), Schema, {
    abortEarly: false
  })
}
