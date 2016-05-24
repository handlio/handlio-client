var test = require('tape');

test('Angular mocks should exist', function (assert) {
    assert.true(typeof angular !== 'undefined', 'angular is ok');
    assert.true(typeof angular.mock !== 'undefined', 'angular.mock is ok');
    assert.true(typeof angular.mock.inject !== 'undefined', 'angular.mock.inject is ok');
    assert.true(typeof angular.mock.module !== 'undefined', 'angular.mock.module is ok');
    assert.true(typeof angular.mock.module.$$beforeEach !== 'undefined', 'angular.mock.module.$$beforeEach is ok');
    assert.true(typeof angular.mock.module.$$afterEach !== 'undefined', 'angular.mock.module.$$afterEach is ok');

    assert.end();
});