/* eslint-env mocha */

'use strict'

require('dotenv').config()
const expect = require('chai').expect

const urlExists = require('../src/url-exists')

const MockOptions = require('./mocks/options')
const S3 = require('..')(MockOptions)

/**
 * @description S3 Object Mocks
 */
const MockUploadObject = require('./mocks/object/upload')
const MockSelectObject = require('./mocks/object/select')
const MockDeleteObject = require('./mocks/object/delete')

/**
 * @description S3 Bucket Mocks
 */
const MockCreateBucket = require('./mocks/bucket/create')
const MockDeleteBucket = require('./mocks/bucket/delete')

describe('Aws S3 Package Tests', () => {
  describe('Upload tests', () => {
    it('Expect not upload an image', () => {
      const payload = {}

      return S3.upload(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.message).to.equal('string')
        })
    })

    it('Expect to upload an image', async () => {
      const payload = MockUploadObject.imageWithContentType
      const expectedKey = `${payload.key}${payload.fileExtension}`

      try {
        const response = await S3.upload(payload)
        expect(typeof response).to.equal('object')
        expect(typeof response.ETag).to.equal('string')
        expect(typeof response.Key).to.equal('string')
        expect(response.Key).to.equal(expectedKey)
        expect(typeof response.Bucket).to.equal('string')
        expect(response.Bucket).to.equal(MockOptions.S3_BUCKET)
        expect(typeof response.Location).to.equal('string')
        expect(response.Location.length).to.be.greaterThan(0)

        const s3Result = await urlExists({
          key: response.Key,
          bucket: MockOptions.S3_BUCKET,
          region: MockOptions.S3_REGION
        })

        expect(typeof s3Result).to.equal('object')
        expect(typeof s3Result.status).to.equal('boolean')
        expect(s3Result.status).to.equal(true)
        expect(typeof s3Result.url).to.equal('string')
        expect(s3Result.url.length).to.be.greaterThan(0)
      } catch (err) {
        expect(err).to.equal(undefined)
      }
    })

    it('Expect to upload an xlsx', async () => {
      const payload = MockUploadObject.documentWithContentType

      try {
        const response = await S3.upload(payload)
        expect(typeof response).to.equal('object')
        expect(typeof response.ETag).to.equal('string')
        expect(typeof response.Key).to.equal('string')
        expect(typeof response.Bucket).to.equal('string')
        expect(response.Bucket).to.equal(MockOptions.S3_BUCKET)
        expect(typeof response.Location).to.equal('string')
        expect(response.Location.length).to.be.greaterThan(0)

        const s3Result = await urlExists({
          key: response.Key,
          bucket: MockOptions.S3_BUCKET,
          region: MockOptions.S3_REGION
        })

        expect(typeof s3Result).to.equal('object')
        expect(typeof s3Result.status).to.equal('boolean')
        expect(s3Result.status).to.equal(true)
        expect(typeof s3Result.url).to.equal('string')
        expect(s3Result.url.length).to.be.greaterThan(0)
      } catch (err) {
        expect(err).to.equal(undefined)
      }
    })
  })

  describe('Select tests', () => {
    it('Expect not select a key', () => {
      const payload = {}

      return S3.select(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.message).to.equal('string')
        })
    })

    it('Expect to select a key', () => {
      const payload = MockSelectObject.payload

      return S3.select(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
          expect(typeof response.status).to.equal('boolean')
          expect(response.status).to.equal(true)
          expect(typeof response.url).to.equal('string')
          expect(response.url.length).to.be.greaterThan(0)
        })
        .catch(err => {
          expect(err).to.equal(undefined)
        })
    })
  })

  describe('DeleteObject tests', () => {
    it('Expect not delete a key', () => {
      const payload = {}

      return S3.deleteObject(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.message).to.equal('string')
        })
    })

    it('Expect to delete a key', () => {
      const payload = MockDeleteObject.payload

      return S3.deleteObject(payload)
        .then(async (response) => {
          expect(typeof response).to.equal('object')
          expect(typeof response.Key).to.equal('string')
          expect(response.Key).to.equal(payload.key)

          const s3Result = await urlExists({
            key: response.Key,
            bucket: MockOptions.S3_BUCKET,
            region: MockOptions.S3_REGION
          })

          expect(s3Result).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.status).to.equal('boolean')
          expect(err.status).to.equal(false)
          expect(typeof err.errors).to.equal('object')
        })
    })
  })

  describe('Create Bucket tests', () => {
    it('Expect not create bucket cause of invalid name', async () => {
      const payload = MockCreateBucket.invalidBucketName

      return S3.createBucket(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.name).to.equal('string')
        })
    })

    it('Expect to create bucket', () => {
      const payload = MockCreateBucket.valid

      return S3.createBucket(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
          expect(typeof response.Location).to.equal('string')
        })
        .catch(err => {
          expect(err).to.equal(undefined)
        })
    })
  })

  describe('Delete Bucket tests', () => {
    it('Expect not delete bucket cause of invalid name', async () => {
      const payload = MockDeleteBucket.invalidBucketName

      return S3.deleteBucket(payload)
        .then(response => {
          expect(response).to.equal(undefined)
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.name).to.equal('string')
        })
    })

    it('Expect to delete bucket', async () => {
      const payload = MockDeleteBucket.valid

      return S3.deleteBucket(payload)
        .then(response => {
          expect(typeof response).to.equal('object')
        })
        .catch(err => {
          expect(typeof err).to.equal('object')
          expect(typeof err.name).to.equal('string')
        })
    })
  })
})
