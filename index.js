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
		throw new TypeError(`Expected a platform name (string) for example 'linux', but got a non-string value ${
			inspectWithKind(platform)
		}.`);
	}

	if (process.platform !== platform) {
		Object.defineProperty(process, 'platform', {value: platform});
	}

	return platform;
}

Object.defineProperty(pretendPlatform, 'original', {
	enumerable: true,
	value: process.platform
});

module.exports = pretendPlatform;

module.exports.restore = function restore() {
	if (process.platform !== pretendPlatform.original) {
		Object.defineProperty(process, 'platform', {value: pretendPlatform.original});
	}

	return process.platform;
};
