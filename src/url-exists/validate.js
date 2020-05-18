'use strict'

const Joi = require('@hapi/joi')
const { defineErrorMessages } = require('@btime/error-messages')

const DEFAULT_SCHEMA = {
  bucket: Joi.string()
    .required()
    .description('the bucket to get url'),

  region: Joi.string()
    .required()
    .description('the region to get url'),

  key: Joi.string()
    .required()
    .description('the key to get url')
}

module.exports.validate = params => {
  const isValid = Joi.validate(params, DEFAULT_SCHEMA, { abortEarly: false })

  if (isValid.error) {
    const err = {
      status: false,
      errors: defineErrorMessages({
        serviceValidator: 'joi',
        serviceName: 'internal',
        joiErrors: isValid.error.details,
        ...(params.lang && { lang: params.lang })
      })
    }
    throw err
  }
}
