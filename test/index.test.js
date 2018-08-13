/* eslint-env mocha */

'use strict'

require('dotenv').config()
const expect = require('chai').expect
const S3UrlExists = require('s3-url-exists')
const MockOptions = require('./mocks/options')
const S3 = require('..')(MockOptions)
const MockUpload = require('./mocks/upload')
const MockSelect = require('./mocks/select')
const MockDelete = require('./mocks/delete')

describe('Aws S3 Package Tests', () => {
  describe('Upload test', () => {
    it('Expect upload an image', () => {
      const payload = MockUpload.imageWithContentType
      const expectedKey = `${payload.key}${payload.fileExtension}`

      S3.upload(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
          expect(typeof response.ETag).to.equal('string')
          expect(typeof response.Key).to.equal('string')
          expect(response.Key).to.equal(expectedKey)
          expect(typeof response.Bucket).to.equal('string')
          expect(response.Bucket).to.equal(MockOptions.S3_BUCKET)
          expect(typeof response.Location).to.equal('string')
          expect(response.Location.length).to.be.greaterThan(0)
          S3UrlExists({
            key: response.Key,
            bucket: MockOptions.S3_BUCKET,
            region: MockOptions.S3_REGION
          })
            .then(result => {
              expect(typeof result).to.equal('object')
              expect(typeof result.status).to.equal('boolean')
              expect(result.status).to.equal(true)
              expect(typeof result.url).to.equal('string')
              expect(result.url.length).to.be.greaterThan(0)
              Promise.resolve(null)
            })
            .catch(err => {
              expect(err).to.equal(undefined)
              Promise.resolve(null)
            })
        })
        .catch(err => {
          expect(err).to.equal(undefined)
        })
    })

    it('Expect upload an xlsx', async () => {
      const payload = MockUpload.documentWithContentType
      await S3.upload(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
          expect(typeof response.ETag).to.equal('string')
          expect(typeof response.Key).to.equal('string')
          expect(typeof response.Bucket).to.equal('string')
          expect(response.Bucket).to.equal(MockOptions.S3_BUCKET)
          expect(typeof response.Location).to.equal('string')
          expect(response.Location.length).to.be.greaterThan(0)
          S3UrlExists({
            key: response.Key,
            bucket: MockOptions.S3_BUCKET,
            region: MockOptions.S3_REGION
          })
            .then(result => {
              expect(typeof result).to.equal('object')
              expect(typeof result.status).to.equal('boolean')
              expect(result.status).to.equal(true)
              expect(typeof result.url).to.equal('string')
              expect(result.url.length).to.be.greaterThan(0)
            })
            .catch(err => {
              expect(err).to.equal(undefined)
            })
        })
        .catch(err => {
          expect(err).to.equal(undefined)
        })
    })

    it('Expect not upload an image', () => {
      const payload = {}
      S3.upload(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.message).to.equal('string')
        })
    })
  })

  describe('Select test:', () => {
    it('Expect select a key', () => {
      const payload = MockSelect.payload
      S3.select(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
          expect(typeof response.status).to.equal('boolean')
          expect(response.status).to.equal(true)
          expect(typeof response.url).to.equal('string')
          expect(response.url.length).to.be.greaterThan(0)
        })
        .catch(err => {
          console.log('\n\n\n err', err, '\n\n\n')
          expect(err).to.equal(undefined)
        })
    })

    it('Expect not select a key', () => {
      const payload = {}
      S3.select(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.message).to.equal('string')
        })
    })
  })

  describe('DeleteObject test:', () => {
    it('Expect delete a key', () => {
      const payload = MockDelete.payload
      S3.deleteObject(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
          expect(typeof response.Key).to.equal('string')
          expect(response.Key).to.equal(payload.key)
          S3UrlExists({
            key: response.Key,
            bucket: MockOptions.S3_BUCKET,
            region: MockOptions.S3_REGION
          })
            .then(result => {
              expect(result).to.equal(undefined)
            })
            .catch(err => {
              expect(typeof err).to.equal('object')
              expect(typeof err.status).to.equal('boolean')
              expect(err.status).to.equal(false)
              expect(typeof err.message).to.equal('object')
            })
        })
        .catch(err => {
          expect(err).to.equal(undefined)
        })
    })

    it('Expect not delete a key', () => {
      const payload = {}
      S3.deleteObject(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.message).to.equal('string')
        })
    })
  })
})
