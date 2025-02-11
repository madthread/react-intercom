'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntercomAPI = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var IntercomAPI = exports.IntercomAPI = function IntercomAPI() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (canUseDOM && window.Intercom) {
    window.Intercom.apply(null, args);
  } else {
    console.warn('Intercom not initialized yet');
  }
};

var Intercom = function (_Component) {
  _inherits(Intercom, _Component);

  function Intercom(props) {
    _classCallCheck(this, Intercom);

    var _this = _possibleConstructorReturn(this, (Intercom.__proto__ || Object.getPrototypeOf(Intercom)).call(this, props));

    var appID = props.appID,
        otherProps = _objectWithoutProperties(props, ['appID']);

    if (!appID || !canUseDOM) {
      return _possibleConstructorReturn(_this);
    }

    if (!window.Intercom) {
      (function (w, d, id, s, x) {
        function i() {
          i.c(arguments);
        }
        i.q = [];
        i.c = function (args) {
          i.q.push(args);
        };
        w.Intercom = i;
        s = d.createElement('script');
        s.async = 1;
        s.src = 'https://widget.intercom.io/widget/' + id;
        d.head.appendChild(s);
      })(window, document, appID);
    }

    window.intercomSettings = _extends({}, otherProps, { app_id: appID });

    if (window.Intercom) {
      window.Intercom('boot', otherProps);
    }
    return _this;
  }

  _createClass(Intercom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var appID = nextProps.appID,
          otherProps = _objectWithoutProperties(nextProps, ['appID']);

      if (!canUseDOM) return;

      window.intercomSettings = _extends({}, otherProps, { app_id: appID });

      if (window.Intercom) {
        if (this.loggedIn(this.props) && !this.loggedIn(nextProps)) {
          // Shutdown and boot each time the user logs out to clear conversations
          window.Intercom('shutdown');
          window.Intercom('boot', otherProps);
        } else {
          window.Intercom('update', otherProps);
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!canUseDOM || !window.Intercom) return false;

      window.Intercom('shutdown');
    }
  }, {
    key: 'loggedIn',
    value: function loggedIn(props) {
      return props.email || props.user_id;
    }
  }, {
    key: 'render',
    value: function render() {
      return false;
    }
  }]);

  return Intercom;
}(_react.Component);

Intercom.propTypes = {
  appID: _propTypes2.default.string.isRequired
};
Intercom.displayName = 'Intercom';
exports.default = Intercom;