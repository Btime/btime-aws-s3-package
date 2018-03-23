# AWS S3 Package

![coverage](https://img.shields.io/badge/coverage-94.12%25-yellow.svg) ![node](https://img.shields.io/badge/node-v8.9.0-brightgreen.svg) ![npm](https://img.shields.io/badge/npm-v5.6.0-blue.svg)

## AWS-S3

This package is an abstraction of the **AWS S3** `upload, select` and `deleteObject` actions.

## Usage

When requiring `aws-s3` package, you **must** have your `aws s3 credentials` to use as parameter like example below:

```JS
const options = {
  S3_REGION: 's3-region-here',
  S3_KEY_SECRET: 's3-key-secret-here',
  S3_KEY_ID: 's3-key-id-here',
  S3_BUCKET: 's3-bucket-here'
}
const S3 = require('aws-s3')(options)
```

**Note:** this is an example, we **recomend** you get options using `dotenv`, an example can be find in our Testing section.

Aws-s3 package returns an `AWS.S3()` instance along with `upload, select, deleteObject` functions that are Promisses, you can freely use AWS.S3 instance like you want, but our overwriten functions **should** be used like:

### Upload

```JS
S3.upload(payload)
  .then(response => {
    /* HANDLE RESPONSE */
  })
  .catch(err => {
    /* HANDLE ERROR */
  })
```

Payload example:

```JS
const payload = {
  key: 'optionalKey',
  file: 'requiredBuffer',
  fileExtension: 'optionalExetension',
  contentType: 'optionalMimeType'
}
```

Response example:

```JS
{
  ETag: '"123x321XX"',
  Location: 'https://s3-sa-east-1.amazonaws.com/bucket-test/keyExample',
  Key: 'keyExample',
  Bucket: 'bucket-test'
}
```

### Select

```JS
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

```JS
const payload = {
  key: 'requiredKey'
}
```

Response example:

```JS
{ status: true, url: 'https://s3-sa-east-1.amazonaws.com/bucket-test/keyExample' }
```

### DeleteObject

```JS
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

```JS
const payload = {
  key: 'requiredKey'
}
```

Response example:

```JS
{ Key: 'keyExample' }
```

## Testing

Tests are coverage by Mocha and Chai, also, all inputs are validate by Joi.

### Running

1. Creating environment file

```bash
cp .env.dist .env
```

2. Edit environment file with your s3 credentials

3. Running with npm

```bash
npm test
```

**Optional:** Running test with coverage report using `Istanbul`:

```bash
npm run coverage
```
