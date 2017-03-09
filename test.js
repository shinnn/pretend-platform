'use strict';

const osPlatform = require('os').platform;

const pretendPlatform = require('.');
const test = require('tape');

const originalPlatform = process.platform;

test('pretendPlatform()', t => {
  t.strictEqual(
    pretendPlatform.name,
    'pretendPlatform',
    'should have a function name.'
  );

  pretendPlatform('foo');

  t.strictEqual(
    process.platform,
    'foo',
    'should modify `process.platform`.'
  );

  t.strictEqual(
    pretendPlatform('foo'),
    'foo',
    'should return the pretended platform.'
  );

  t.strictEqual(
    osPlatform(),
    'foo',
    'should modify the return value of `os.platform`.'
  );

  t.throws(
    () => pretendPlatform(1),
    /TypeError.*Expected a platform name \(string\) for example 'linux', but got a non-string value 1 \(number\)\./,
    'should throw a type error when it takes a non-string argument.'
  );

  t.throws(
    () => pretendPlatform(),
    /TypeError.*Expected 1 argument \(string\), but got no arguments instead\./,
    'should throw a type error when it takes no arguments.'
  );

  t.throws(
    () => pretendPlatform('a', 'b'),
    /TypeError.*Expected 1 argument \(string\), but got 2 arguments instead\./,
    'should throw a type error when it takes too many arguments.'
  );

  t.end();
});

test('pretendPlatform.restore()', t => {
  t.strictEqual(
    pretendPlatform.restore.name,
    'restore',
    'should have a function name.'
  );

  t.strictEqual(
    pretendPlatform.restore(),
    originalPlatform,
    'should return the original platform.'
  );

  t.strictEqual(
    process.platform,
    originalPlatform,
    'should restore `process.platform`.'
  );

  pretendPlatform.restore();

  t.strictEqual(
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

  t.strictEqual(
    pretendPlatform.original,
    originalPlatform,
    'should preserve the original `process.platform`.'
  );

  t.throws(
    () => pretendPlatform.original = 'another value', // eslint-disable-line no-return-assign
    /^TypeError.*Cannot assign to read only property 'original'/,
    'should be unoverwritable.'
  );

  t.end();
});
