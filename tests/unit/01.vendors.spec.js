// dependencies

var tape = require('tape');

tape('Angular mocks should exist', function (assert) {
    assert.true(typeof inject !== 'undefined', 'inject is ok');
    assert.true(typeof module !== 'undefined', 'module is ok');
    assert.true(typeof angular !== 'undefined', 'angular is ok');
    assert.true(typeof angular.mock !== 'undefined', 'angular.mock is ok');
    assert.true(typeof angular.mock.inject !== 'undefined', 'angular.mock.inject is ok');
    assert.true(typeof angular.mock.module !== 'undefined', 'angular.mock.module is ok');
    assert.true(typeof angular.mock.module.$$beforeEach !== 'undefined', 'angular.mock.module.$$beforeEach is ok');
    assert.true(typeof angular.mock.module.$$afterEach !== 'undefined', 'angular.mock.module.$$afterEach is ok');
    assert.true(angular.mock.inject === inject, 'angular.mock.inject is equal inject');
    assert.true(angular.mock.module === window.module, 'angular.mock.module is equal window.module');
    assert.true(tape.angular.beforeEach === angular.mock.module.$$beforeEach, 'tape.angular.beforeEach is equal angular.mock.module.$$beforeEach');
    assert.true(tape.angular.afterEach === angular.mock.module.$$afterEach, 'tape.angular.afterEach is equal angular.mock.module.$$afterEach');

    assert.end();
});