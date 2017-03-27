'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer(callback, delay) {
        _classCallCheck(this, Timer);

        this.timerId;
        this.remaining = delay;
        this.callback = callback;

        this.resume();
    }

    _createClass(Timer, [{
        key: 'pause',
        value: function pause() {
            clearTimeout(this.timerId);
            this.remaining -= new Date() - this.start;
        }
    }, {
        key: 'resume',
        value: function resume() {
            this.start = new Date();
            clearTimeout(this.timerId);
            this.timerId = setTimeout(this.callback, this.remaining);
        }
    }, {
        key: 'clear',
        value: function clear() {
            clearTimeout(timerId);
        }
    }]);

    return Timer;
}();

module.exports = Timer;