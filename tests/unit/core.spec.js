var tape = require('tape');

var test = tape.angular.wrap();

test('Core module preparations', function (assert) {
    angular.mock.module('handlio.client');

    assert.end();
});