// dependencies
var tape = require('tape');

// turning on angular mocks for tape framework
window.mocha = tape;
window.jasmine = tape;

tape.beforeEach = _beforeEach;
tape.afterEach = _afterEach;

window.beforeAll = _noop;
window.before = _noop;
window.afterAll = _noop;
window.after = _noop;
window.beforeEach = _noop;
window.setup = _noop;
window.afterEach = _noop;
window.teardown = _noop;

function _noop() {

}

// Has taken from https://github.com/substack/tape/issues/59

function _beforeEach(test, handler) {
    return function tapish(name, listener) {
        test(name, function (assert) {
            var _end = assert.end;
            assert.end = function () {
                assert.end = _end;
                listener(assert);
            };

            handler(assert);
        });
    }
}

function _afterEach(test, handler) {
    return function tapish(name, listener) {
        test(name, function (assert) {
            var _end = assert.end;
            assert.end = function () {
                assert.end = _end;
                handler(assert);
            };

            listener(assert);
        });
    }
}