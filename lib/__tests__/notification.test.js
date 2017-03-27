'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _Container = require('../Container');

var _Container2 = _interopRequireDefault(_Container);

var _Item = require('../Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultNotification = {
    message: 'This is a message'
};

describe('Component', function () {
    var node = void 0;
    var instance = void 0;
    var component = void 0;
    var ref = 'notificationSystem';

    it('test', function () {
        (0, _chai.expect)('true').to.equal('true');
    });

    beforeEach(function () {
        var ElementWrapper = function (_Component) {
            _inherits(ElementWrapper, _Component);

            function ElementWrapper() {
                _classCallCheck(this, ElementWrapper);

                return _possibleConstructorReturn(this, (ElementWrapper.__proto__ || Object.getPrototypeOf(ElementWrapper)).apply(this, arguments));
            }

            _createClass(ElementWrapper, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(_Container2.default, { ref: ref });
                }
            }]);

            return ElementWrapper;
        }(_react.Component);

        node = window.document.createElement('div');
        instance = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(ElementWrapper), node);
        component = instance.refs[ref];
    });

    it('should be rendered', function () {
        component = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(instance, 'div');
        should.exist(component);
    });

    it('should render a single notification', function () {
        component.add(defaultNotification);
        var notifications = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(instance, _Item2.default);
        (0, _chai.expect)(notifications).to.have.length(1);
    });

    it('notification with good text', function () {
        component.add(defaultNotification);
        var notification = _reactAddonsTestUtils2.default.findRenderedComponentWithType(instance, _Item2.default);
        var text = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(notification, 'div').textContent;
        (0, _chai.expect)(text).to.equal(defaultNotification.message);
    });

    it('click close to notification', function () {
        component.add(defaultNotification);
        var notifications = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(instance, _Item2.default);
        (0, _chai.expect)(notifications).to.have.length(1);

        var notificationNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(notifications[0], 'div');
        _reactAddonsTestUtils2.default.Simulate.click(notificationNode);

        notifications = _reactAddonsTestUtils2.default.scryRenderedComponentsWithType(instance, _Item2.default);
        (0, _chai.expect)(notifications).to.have.length(0);
    });

    it('level default', function () {
        component.add(defaultNotification);
        var notification = _reactAddonsTestUtils2.default.findRenderedComponentWithType(instance, _Item2.default);
        var notificationNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(notification, 'div');

        (0, _chai.expect)(notificationNode.className).to.match(/notification--level-default/);
    });

    ['success', 'error', 'warning', 'info', 'default'].forEach(function (level) {
        it('level ' + level, function () {
            component.add(Object.assign({}, defaultNotification, { level: level }));
            var notification = _reactAddonsTestUtils2.default.findRenderedComponentWithType(instance, _Item2.default);
            var notificationNode = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(notification, 'div');

            var className = new RegExp('notification--level-' + level);

            (0, _chai.expect)(notificationNode.className).to.match(className);
        });
    });

    ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'].forEach(function (position) {
        it('position', function () {
            component.add(Object.assign({}, defaultNotification, { position: position }));
            var notificationContainerNode = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(instance, 'div')[1];

            var className = new RegExp('notifications--position-' + position);

            (0, _chai.expect)(notificationContainerNode.className).to.match(className);
        });
    });
});