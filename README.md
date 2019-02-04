# pretend-platform

[![npm version](https://img.shields.io/npm/v/pretend-platform.svg)](https://www.npmjs.com/package/pretend-platform)
[![Build Status](https://travis-ci.com/shinnn/pretend-platform.svg?branch=master)](https://travis-ci.com/shinnn/pretend-platform)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/pretend-platform.svg)](https://coveralls.io/github/shinnn/pretend-platform)

A [Node.js](https://nodejs.org/) module to pretend the current process is running on a given platform

```javascript
const pretendPlatform = require('pretend-platform');

process.platform; //=> 'darwin'

pretendPlatform('win32');
process.platform; //=> 'win32'
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install pretend-platform
```

## API

```javascript
const pretendPlatform = require('pretend-platform');
```

### pretendPlatform(*platform*)

*platform*: `string` (a platform name to pretend)  
Return: `string` (the pretended platform name)

It modifies [`process.platform`](https://nodejs.org/api/process.html#process_process_platform) into the given value.

### pretendPlatform.restore()

Return: `String` ([`pretendPlatform.original`](#pretendplatformoriginal))

It restores `process.platform` to the original value.

```javascript
const pretendPlatform = require('pretend-platform');

process.platform; //=> 'linux'

pretendPlatform('freebsd');
process.platform; //=> 'freebsd'

pretendPlatform.restore();
process.platform; //=> 'linux'
```

### pretendPlatform.original

Type: `string`

The read-only property preserving the original `process.platform`.

## License

Copyright (c) 2015 - 2019 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
