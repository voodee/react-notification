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

var _immutable2 = _interopRequireDefault(_immutable);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _close = require('react-icons/md/close');

var _close2 = _interopRequireDefault(_close);

var _Timer = require('./utils/Timer');

var _Timer2 = _interopRequireDefault(_Timer);

var _styles = require('./styles.sass');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationItem = (_dec = (0, _reactCssModules2.default)(_styles2.default, { allowMultiple: true }), _dec(_class = function (_Component) {
    _inherits(NotificationItem, _Component);

    function NotificationItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NotificationItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NotificationItem.__proto__ || Object.getPrototypeOf(NotificationItem)).call.apply(_ref, [this].concat(args))), _this), _this._onRemove = function () {
            _this.props.onRemove();
        }, _this._handleMouseEnter = function () {
            _this._timer.pause();
        }, _this._handleMouseLeave = function () {
            _this._timer.resume();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NotificationItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var notification = this.props.notification;


            if (notification.get('autoDismiss') && notification.get('dismissible')) {
                this._timer = new _Timer2.default(this._onRemove, notification.get('autoDismiss') * 1000);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var notification = this.props.notification,
                animationType = notification.get('animationType'),
                transitionEnterTimeout = notification.get('transitionEnterTimeout'),
                transitionLeaveTimeout = notification.get('transitionLeaveTimeout');


            return _react2.default.createElement(
                'div',
                {
                    styleName: 'notification notification--level-' + notification.get('level') + ' ' + (notification.get('closeButton') ? 'notification--with-close-button' : ''),
                    onClick: this._onRemove,
                    onMouseEnter: this._handleMouseEnter,
                    onMouseLeave: this._handleMouseLeave
                },
                notification.get('message'),
                notification.get('closeButton') && _react2.default.createElement(_close2.default, { styleName: 'notification-icon', size: 26 })
            );
        }
    }]);

    return NotificationItem;
}(_react.Component)) || _class);
exports.default = NotificationItem;


NotificationItem.propTypes = {
    onRemove: _react2.default.PropTypes.func.isRequired,
    notification: _react2.default.PropTypes.instanceOf(_immutable2.default.Map).isRequired
};