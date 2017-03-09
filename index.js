/*!
 * pretend-platform | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/pretend-platform
*/
'use strict';

const inspectWithKind = require('inspect-with-kind');

function pretendPlatform(...args) {
  const arglen = args.length;

  if (arglen !== 1) {
    throw new TypeError(`Expected 1 argument (string), but got ${
      arglen === 0 ? 'no' : arglen
    } arguments instead.`);
  }

  const [platform] = args;

  if (typeof platform !== 'string') {
    throw new TypeError(
      `Expected a platform name (string) for example 'linux', but got a non-string value ${
        inspectWithKind(platform)
      }.`
    );
  }

  if (process.platform !== platform) {
    Object.defineProperty(process, 'platform', {value: platform});
  }

  return platform;
}

module.exports = pretendPlatform;
module.exports.ORIGINAL_PLATFORM = process.platform;

module.exports.restore = function restore() {
  if (process.platform !== module.exports.ORIGINAL_PLATFORM) {
    Object.defineProperty(process, 'platform', {value: module.exports.ORIGINAL_PLATFORM});
  }

  return process.platform;
};
