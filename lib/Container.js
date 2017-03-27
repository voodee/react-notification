'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _constants = require('./constants');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _styles = require('./styles.sass');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notification = (_dec = (0, _reactCssModules2.default)(_styles2.default, { allowMultiple: true }), _dec(_class = function (_Component) {
    _inherits(Notification, _Component);

    function Notification(props) {
        _classCallCheck(this, Notification);

        var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

        _this.uid = 0;
        _this.state = {
            notifications: (0, _immutable.List)()
        };
        return _this;
    }

    _createClass(Notification, [{
        key: 'add',
        value: function add(notification) {
            var _notification = _constants.defaultValue.merge((0, _immutable.Map)({ uid: ++this.uid })).merge((0, _immutable.Map)(notification));

            // validation position
            if (!_constants.positions.includes(_notification.get('position'))) {
                throw new Error('notification position "' + _notification.get('position') + '" unsupported');
            }

            // validation level
            if (!_constants.levels.get(_notification.get('level'))) {
                throw new Error('notification level "' + _notification.get('level') + '" unsupported');
            }

            var notifications = this.state.notifications.push(_notification);
            this.setState({ notifications: notifications });
        }
    }, {
        key: 'remove',
        value: function remove(uid) {
            this.setState({
                notifications: this.state.notifications.filter(function (notification) {
                    if (notification.get('uid') === uid) {
                        if (notification.get('onRemove')) {
                            notification.get('onRemove')(notification);
                        }
                        return false;
                    }
                    return true;
                })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // if ( ! this.state.notifications.size ) return null;

            // Group by position
            var notifications = _constants.positions.valueSeq().map(function (position) {
                var _notifications = _this2.state.notifications.filter(function (notification) {
                    return position === notification.get('position');
                });

                if (!_notifications.size) return null;

                return _react2.default.createElement(
                    'div',
                    { styleName: 'notifications notifications--position-' + position, key: position },
                    _notifications.map(function (notification) {
                        return _react2.default.createElement(_Item2.default, {
                            key: notification.get('uid'),
                            notification: notification,
                            onRemove: _this2.remove.bind(_this2, notification.get('uid'))
                        });
                    })
                );
            });

            return _react2.default.createElement(
                'div',
                null,
                notifications
            );
        }
    }]);

    return Notification;
}(_react.Component)) || _class);
exports.default = Notification;