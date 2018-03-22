# Btime Aws S3 Package

## Package Aws S3

This package is an abstraction of the **AWS S3 Upload** action once it can be performed by some micro services.


### Usage

This package return is a new `AWS.S3()` instance and an overwriten `upload` function that allows upload regular or xlsx files.

When require the package you **must** send options parameters, this can be loaded in `srv/start.js` as pattern bellow:

```JS
const options = {
  s3: {
    S3_BUCKET: ENVS.S3_BUCKET || '...',
    S3_KEY_ID: ENVS.S3_KEY_ID || '...',
    S3_KEY_SECRET: ENVS.S3_KEY_SECRET || '...',
    S3_REGION: ENVS.S3_REGION || '...'
  }
}
```

Usage Example:

```JS
  const S3 = require('../lib/btime-aws-s3-package')(options)

  const payload = getS3Payload(...)
  S3.upload(payload)

  function getS3Payload (params) {
    return {
      file: params.file,
      contentType: params.file,
      key: params.key,
      fileExtension: params.fileExtension
    }
  }
```
