'use strict';

var pretendPlatform = require('./');
var test = require('tape');

var originalPlatform = process.platform;

test('pretendPlatform()', function(t) {
  t.plan(5);

  t.strictEqual(
    pretendPlatform.name,
    'pretendPlatform',
    'should have a function name.'
  );

  t.strictEqual(
    pretendPlatform('foo'),
    'foo',
    'should return the pretended platform.'
  );

  t.strictEqual(
    process.platform,
    'foo',
    'should modify `process.platform`.'
  );

  t.throws(
    pretendPlatform.bind(null, 1),
    /TypeError.*1 is not a string\. Expected a platform name \(e\.g\. "darwin", "freebsd"\)\./,
    'should throw a type error when it takes a non-string argument.'
  );

  t.throws(
    pretendPlatform.bind(null),
    /TypeError.*undefined is not a string\./,
    'should throw a type error when it takes no arguments.'
  );
});

test('pretendPlatform.restore()', function(t) {
  t.plan(4);

  t.strictEqual(
    pretendPlatform.restore.name,
    'restorePretendedPlatform',
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
});

test('pretendPlatform.ORIGINAL_PLATFORM', function(t) {
  t.plan(1);

  t.strictEqual(
    pretendPlatform.ORIGINAL_PLATFORM,
    originalPlatform,
    'should preserve the original `process.platform`.'
  );
});
