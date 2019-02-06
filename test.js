'use strict';

const osPlatform = require('os').platform;

const pretendPlatform = require('.');
const test = require('tape');

const originalPlatform = process.platform;

test('pretendPlatform()', t => {
	t.equal(
		pretendPlatform.name,
		'pretendPlatform',
		'should have a function name.'
	);

	pretendPlatform('foo');

	t.equal(
		process.platform,
		'foo',
		'should modify `process.platform`.'
	);

	t.equal(
		pretendPlatform('foo'),
		'foo',
		'should return the pretended platform.'
	);

	t.equal(
		osPlatform(),
		'foo',
		'should modify the return value of `os.platform`.'
	);

	t.throws(
		() => pretendPlatform(1),
		/TypeError.*Expected a platform name \(string\) for example 'linux', but got a non-string value 1 \(number\)\./u,
		'should throw a type error when it takes a non-string argument.'
	);

	t.throws(
		() => pretendPlatform(),
		/TypeError.*Expected 1 argument \(string\), but got no arguments instead\./u,
		'should throw a type error when it takes no arguments.'
	);

	t.throws(
		() => pretendPlatform('a', 'b'),
		/TypeError.*Expected 1 argument \(string\), but got 2 arguments instead\./u,
		'should throw a type error when it takes too many arguments.'
	);

	t.end();
});

test('pretendPlatform.restore()', t => {
	t.equal(
		pretendPlatform.restore.name,
		'restore',
		'should have a function name.'
	);

	t.equal(
		pretendPlatform.restore(),
		originalPlatform,
		'should return the original platform.'
	);

	t.equal(
		process.platform,
		originalPlatform,
		'should restore `process.platform`.'
	);

	pretendPlatform.restore();

	t.equal(
		process.platform,
		originalPlatform,
		'should do nothing when `process.platform` is not modified.'
	);

	t.end();
});

test('pretendPlatform.original', t => {
	t.ok(
		Reflect.ownKeys(pretendPlatform).includes('original'),
		'should be enumerable.'
	);

	t.equal(
		pretendPlatform.original,
		originalPlatform,
		'should preserve the original `process.platform`.'
	);

	t.throws(
		() => pretendPlatform.original = 'another value', // eslint-disable-line no-return-assign
		/^TypeError.*Cannot assign to read only property 'original'/u,
		'should be unoverwritable.'
	);

	t.end();
});
