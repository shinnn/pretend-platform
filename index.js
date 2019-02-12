'use strict';

const inspectWithKind = require('inspect-with-kind');

const originalPropertyDescriptor = Reflect.getOwnPropertyDescriptor(process, 'platform');

module.exports = function pretendPlatform(...args) {
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
		Object.defineProperty(process, 'platform', {...originalPropertyDescriptor, value: platform});
	}

	return platform;
};

Object.defineProperties(module.exports, {
	original: originalPropertyDescriptor,
	restore: {
		enumerable: true,
		value: function restore() {
			if (process.platform !== originalPropertyDescriptor.value) {
				Object.defineProperty(process, 'platform', originalPropertyDescriptor);
			}

			return process.platform;
		}
	}
});
