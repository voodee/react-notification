import { Map } from 'immutable'

export const positions = Map({
    topLeft     : 'top-left',
    topRight    : 'top-right',
    topCenter   : 'top-center',
    bottomLeft  : 'bottom-left',
    bottomRight : 'bottom-right',
    bottomCenter: 'bottom-center'
});


export const levels = Map({
    success : 'success',
    error   : 'error',
    warning : 'warning',
    info    : 'info',
    default : 'default'
});


export const animationType = Map({
    ease        : 'ease',
    easeIn      : 'ease-in',
    easeOut     : 'ease-out',
    easeInOut   : 'ease-in-out',
    linear      : 'linear'
});


export const animationTiming = Map({
    none        : '0',
    fast        : '300',
    normal      : '500',
    slow        : '1000'
});


export const defaultValue = Map({
    message                 : '',
    level                   : levels.get('default'),
    position                : positions.get('bottomCenter'),
    autoDismiss             : 5,
    dismissible             : true,
    animationType           : animationType.get('easeIn'),
    transitionEnterTimeout  : animationTiming.get('normal'),
    transitionLeaveTimeout  : animationTiming.get('fast'),
    closeButton             : false
});