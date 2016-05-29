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
    tape.angular.beforeEach();
    console.log('Angular-mocks preparation');
    assert.end();
}

function _afterEach(assert) {
    tape.angular.afterEach();
    console.log('Angular-mocks cleanup');
    assert.end();
}