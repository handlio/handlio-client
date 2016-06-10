// dependencies

var tape = require('tape');

tape.beforeEach = _beforeEach;
tape.afterEach = _afterEach;

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