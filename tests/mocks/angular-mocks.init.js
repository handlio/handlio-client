// turning on angular mocks for tape framework

window.mocha = {};
window.jasmine = {};

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