/*!
 * pretend-platform | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/pretend-platform
*/
'use strict';

module.exports = function pretendPlatform(platform) {
  if (typeof platform !== 'string') {
    throw new TypeError(
      String(platform) +
      ' is not a string. Expected a platform name (e.g. "darwin", "freebsd").'
    );
  }

  if (process.platform !== platform) {
    Object.defineProperty(process, 'platform', {value: platform});
  }

  return platform;
};

module.exports.ORIGINAL_PLATFORM = process.platform;

module.exports.restore = function restorePretendedPlatform() {
  if (process.platform !== module.exports.ORIGINAL_PLATFORM) {
    Object.defineProperty(process, 'platform', {value: module.exports.ORIGINAL_PLATFORM});
  }

  return process.platform;
};
