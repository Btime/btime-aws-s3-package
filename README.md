# Btime AWS S3 Package

![coverage](https://img.shields.io/badge/coverage-94.12%25-yellow.svg) ![node](https://img.shields.io/badge/node-v8.9.0-brightgreen.svg) ![npm](https://img.shields.io/badge/npm-v5.6.0-blue.svg)

## AWS-S3

This package is an abstraction of the **AWS S3** actions throught [AWS SDK](https://github.com/aws/aws-sdk-js) and [S3-URL-Exists package](https://github.com/Btime/s3-url-exists).

The actions available are:
  - **Object:**
    - [`upload `](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property)
    - [`select`](https://github.com/Btime/s3-url-exists/blob/master/src/index.js#L29)
    - [`deleteObject`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property)

  - **Bucket:**
    - [`createBucket`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property)
    - [`deleteBucket`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucket-property)    

## Table of Contents

1. [Install with NPM](#install-with-npm)
1. [Usage](#usage)
    1. [Actions](#actions)
        1. [Upload](#upload)
        1. [Select](#select)
        1. [DeleteObject](#deleteObject)
        1. [CreateBucket](#createBucket)
        1. [DeleteBucket](#deleteBucket)
1. [Testing](#testing)
    1. [Setup](#setup)
    1. [Running](#running)

## Install with npm

```bash
npm install @btime/aws-s3 --save
```

## Usage

When requiring `aws-s3` package, you **must** have your `aws s3 credentials` to use as parameter like example below:

```js
const options = {
  S3_REGION: 's3-region-here',
  S3_KEY_SECRET: 's3-key-secret-here',
  S3_KEY_ID: 's3-key-id-here',
  S3_BUCKET: 's3-bucket-here'
}
const S3 = require('@btime/aws-s3')(options)
```

**Note:** this is an example, we **recomend** you get options using [`dotenv`](https://github.com/motdotla/dotenv) to set env variables, an example can be find in our Testing section.

Aws-s3 package returns an `AWS.S3()` instance along with `upload, select, deleteObject` functions that are Promisses, you can freely use AWS.S3 instance like you want, but our overwriten functions **should** be used like:

### Actions

#### Upload

```js
S3.upload(payload)
  .then(response => {
    /* HANDLE RESPONSE */
  })
  .catch(err => {
    /* HANDLE ERROR */
  })
```

Payload example:

```js
const payload = {
  key: 'optionalKey',
  file: 'requiredBuffer',
  fileExtension: 'optionalExetension',
  contentType: 'optionalMimeType'
}
```

Response example:

```js
{
  ETag: '"123x321XX"',
  Location: 'https://s3-sa-east-1.amazonaws.com/bucket-test/keyExample',
  Key: 'keyExample',
  Bucket: 'bucket-test'
}
```

#### Select

```js
const payload = defineSelectPayload(params)
S3.select(payload)
  .then(response => {
    /* HANDLE RESPONSE */
  })
  .catch(err => {
    /* HANDLE ERROR */
  })
```

Payload example:

```js
const payload = {
  key: 'requiredKey'
}
```

Response example:

```js
{ status: true, url: 'https://s3-sa-east-1.amazonaws.com/bucket-test/keyExample' }
```

#### DeleteObject

```js
const payload = defineDeleteObjectPayload(params)
S3.deleteObject(payload)
  .then(response => {
    /* HANDLE RESPONSE */
  })
  .catch(err => {
    /* HANDLE ERROR */
  })
```

Payload example:

```js
const payload = {
  key: 'requiredKey'
}
```

Response example:

```js
{ Key: 'keyExample' }
```

#### CreateBucket

```js
S3.createBucket(payload)
  .then(response => {
    /* HANDLE RESPONSE */
  })
  .catch(err => {
    /* HANDLE ERROR */
  })
```

Payload example:

```js
const payload = {
  name: 'bucket-name-here'
}
```

Response example:

```js
{
  Location: 'bucket-name-here.s3.amazonaws.com/'
}
```

#### DeleteBucket

```js
S3.deleteBucket(payload)
  .then(response => {
    /* HANDLE RESPONSE */
  })
  .catch(err => {
    /* HANDLE ERROR */
  })
```

Payload example:

```js
const payload = {
  name: 'bucket-name-here'
}
```

Response example:

```js
{}
```

## Testing

Tests are coverage by Mocha and Chai, also, all inputs are validate by Joi.

### Setup

1. Creating environment file

```bash
cp .env.dist .env
```

2. Edit environment file with your s3 credentials

### Running

3. Running with npm

```bash
npm test
```

**Optional:** Running test with coverage report using `Istanbul`:

```bash
npm run coverage
```
