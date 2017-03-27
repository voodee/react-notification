'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultValue = exports.animationTiming = exports.animationType = exports.levels = exports.positions = undefined;

var _immutable = require('immutable');

var positions = exports.positions = (0, _immutable.Map)({
    topLeft: 'top-left',
    topRight: 'top-right',
    topCenter: 'top-center',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
    bottomCenter: 'bottom-center'
});

var levels = exports.levels = (0, _immutable.Map)({
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    default: 'default'
});

var animationType = exports.animationType = (0, _immutable.Map)({
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear'
});

var animationTiming = exports.animationTiming = (0, _immutable.Map)({
    none: '0',
    fast: '300',
    normal: '500',
    slow: '1000'
});

var defaultValue = exports.defaultValue = (0, _immutable.Map)({
    message: '',
    level: levels.get('default'),
    position: positions.get('bottomCenter'),
    autoDismiss: 5,
    dismissible: true,
    animationType: animationType.get('easeIn'),
    transitionEnterTimeout: animationTiming.get('normal'),
    transitionLeaveTimeout: animationTiming.get('fast'),
    closeButton: false
});