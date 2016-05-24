var test = require('tape');

test('Angular mocks should exist', function (assert) {
    assert.true(typeof angular !== 'undefined', 'angular is ok');

    assert.end();
});