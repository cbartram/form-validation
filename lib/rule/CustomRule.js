'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractRule2 = require('./AbstractRule');

var _AbstractRule3 = _interopRequireDefault(_AbstractRule2);

var _RuleFactory = require('./RuleFactory');

var _RuleFactory2 = _interopRequireDefault(_RuleFactory);

var _ValidationError = require('../error/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _ErrorCode = require('../error/ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Custom Rule
 *
 * @author Christian Bartram
 */
var CustomRule = function (_AbstractRule) {
    _inherits(CustomRule, _AbstractRule);

    function CustomRule() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "CustomRule";
        var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var activationFunction = arguments[2];

        _classCallCheck(this, CustomRule);

        var _this = _possibleConstructorReturn(this, (CustomRule.__proto__ || Object.getPrototypeOf(CustomRule)).call(this, name, required));

        _this.activationFunction = activationFunction;
        return _this;
    }

    _createClass(CustomRule, [{
        key: 'getType',
        value: function getType() {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Adds an additional reason why this BASIC rule failed to the stack
         * @param value
         * @param key
         * @param field
         */

    }, {
        key: 'addReason',
        value: function addReason(key, field, value) {
            //Create a "Stack Trace/ValidationError" object
            var error = new _ValidationError2.default(key, _RuleFactory2.default.getRule(this.name));

            //Set the error message
            error.setWhy(field + _ErrorCode2.default.codes()[this.name.toUpperCase()] + value);

            //Update the encapsulated value
            _get(CustomRule.prototype.__proto__ || Object.getPrototypeOf(CustomRule.prototype), 'setWhy', this).call(this, error.getError());
        }
    }, {
        key: 'addReason',
        value: function addReason(key, field) {
            //Create a "Stack Trace/ValidationError" object
            var error = new _ValidationError2.default(key, _RuleFactory2.default.getRule(this.name));

            //Set the error message
            error.setWhy(field + _ErrorCode2.default.codes()[this.name.toUpperCase()]);

            //Update the encapsulated value
            _get(CustomRule.prototype.__proto__ || Object.getPrototypeOf(CustomRule.prototype), 'setWhy', this).call(this, error.getError());
        }
    }, {
        key: 'getWhy',
        value: function getWhy() {
            return _get(CustomRule.prototype.__proto__ || Object.getPrototypeOf(CustomRule.prototype), 'getWhy', this).call(this);
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         */

    }, {
        key: 'failed',
        value: function failed(field) {
            return this.activationFunction(field) === false;
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         * @param value
         */

    }, {
        key: 'failed',
        value: function failed(field, value) {
            return this.activationFunction(field, value) === false;
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         * @param value
         * @param req Express HTTP request object
         */

    }, {
        key: 'failed',
        value: function failed(field, value, req) {
            return this.activationFunction(field, value, req) === false;
        }
    }]);

    return CustomRule;
}(_AbstractRule3.default);

exports.default = CustomRule;