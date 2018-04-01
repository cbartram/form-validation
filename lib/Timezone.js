"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _CustomRule2 = require("./rule/CustomRule");

var _CustomRule3 = _interopRequireDefault(_CustomRule2);

var _RuleFactory = require("./rule/RuleFactory");

var _RuleFactory2 = _interopRequireDefault(_RuleFactory);

var _ValidationError = require("./error/ValidationError");

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _ErrorCode = require("./error/ErrorCode");

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timezone = function (_CustomRule) {
    _inherits(Timezone, _CustomRule);

    function Timezone(name) {
        var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var activationFunction = arguments[2];

        _classCallCheck(this, Timezone);

        var _this = _possibleConstructorReturn(this, (Timezone.__proto__ || Object.getPrototypeOf(Timezone)).call(this, name, req));

        _this.activationFunction = activationFunction;
        return _this;
    }

    _createClass(Timezone, [{
        key: "getType",
        value: function getType() {
            return "BASIC";
        }
    }, {
        key: "failed",
        value: function failed(field) {
            return this.activationFunction;
        }
    }, {
        key: "getActivationFunction",
        value: function getActivationFunction() {}

        /**
         * Adds an additional reason why this
         * rule failed to the stack
         * @param name
         * @param key
         * @param field
         */

    }, {
        key: "addReason",
        value: function addReason(name, key, field) {
            //Create a "Stack Trace/ValidationError" object
            var error = new _ValidationError2.default(key, _RuleFactory2.default.getRule(name));

            //Set the error message
            error.setWhy(field + _ErrorCode2.default.codes()[name.toUpperCase()]);

            //Update the encapsulated value
            _get(Timezone.prototype.__proto__ || Object.getPrototypeOf(Timezone.prototype), "setWhy", this).call(this, error.getError());
        }
    }, {
        key: "reason",
        value: function reason() {
            _get(Timezone.prototype.__proto__ || Object.getPrototypeOf(Timezone.prototype), "getWhy", this).call(this);
        }
    }]);

    return Timezone;
}(_CustomRule3.default);

exports.default = Timezone;