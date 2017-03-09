# pretend-platform

[![NPM version](https://img.shields.io/npm/v/pretend-platform.svg)](https://www.npmjs.com/package/pretend-platform)
[![Build Status](https://travis-ci.org/shinnn/pretend-platform.svg?branch=master)](https://travis-ci.org/shinnn/pretend-platform)
[![Build status](https://ci.appveyor.com/api/projects/status/yrdf0sfxj8rus90h/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/pretend-platform/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/pretend-platform.svg)](https://coveralls.io/github/shinnn/pretend-platform)
[![devDependencies Status](https://david-dm.org/shinnn/pretend-platform/dev-status.svg)](https://david-dm.org/shinnn/pretend-platform?type=dev)

A [Node.js](https://nodejs.org/) module to pretend the current process is running on a given platform

```javascript
const pretendPlatform = require('pretend-platform');

process.platform; //=> 'darwin'

pretendPlatform('win32');
process.platform; //=> 'win32'
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install pretend-platform
```

## API

```javascript
const pretendPlatform = require('pretend-platform');
```

### pretendPlatform(*platform*)

*platform*: `String` (a platform name to pretend)  
Return: `String` (the pretended platform name)

It modifies [`process.platform`](https://nodejs.org/api/process.html#process_process_platform) into the given value.

### pretendPlatform.restore()

Return: `String` ([`pretendPlatform.ORIGINAL_PLATFORM`](#pretendplatformoriginal_platform))

It restores `process.platform` to the original value.

```javascript
const pretendPlatform = require('pretend-platform');

process.platform; //=> 'linux'

pretendPlatform('freebsd');
process.platform; //=> 'freebsd'

pretendPlatform.restore();
process.platform; //=> 'linux'
```

### pretendPlatform.ORIGINAL_PLATFORM

A `String` preserving the original `process.platform`.

## License

Copyright (c) 2015 - 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
