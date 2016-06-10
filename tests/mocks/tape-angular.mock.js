// dependencies

var tape = require('tape');

tape.angular = {
    beforeEach: angular.mock.module.$$beforeEach,
    afterEach: angular.mock.module.$$afterEach,
    wrap: function () {
        return tape.afterEach(tape.beforeEach(tape, _beforeEach), _afterEach);
    }
};

// private functions

function _beforeEach(assert) {
    assert.ok(tape.angular.beforeEach, 'Angular-mocks preparation');
    tape.angular.beforeEach();
    assert.end();
}

function _afterEach(assert) {
    assert.ok(tape.angular.afterEach, 'Angular-mocks cleanup');
    tape.angular.afterEach();
    assert.end();
}