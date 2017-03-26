'use strict';

class Timer {

    constructor(callback, delay) {
        this.timerId;
        this.remaining = delay;
        this.callback = callback;

        this.resume();
    }

    pause() {
        clearTimeout(this.timerId);
        this.remaining -= new Date() - this.start;
    }

    resume() {
        this.start = new Date();
        clearTimeout(this.timerId);
        this.timerId = setTimeout(this.callback, this.remaining)
    }

    clear() {
        clearTimeout(timerId);
    }

}

module.exports = Timer;