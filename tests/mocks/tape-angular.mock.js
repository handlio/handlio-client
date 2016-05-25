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
    console.log('beforeEach');
    assert.end();
}

function _afterEach(assert) {
    tape.angular.afterEach();
    console.log('afterEach');
    assert.end();
}