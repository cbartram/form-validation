'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractRule2 = require('./AbstractRule');

var _AbstractRule3 = _interopRequireDefault(_AbstractRule2);

var _ErrorCode = require('../error/ErrorCode');

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

var _ValidationError = require('../error/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _RuleFactory = require('./RuleFactory');

var _RuleFactory2 = _interopRequireDefault(_RuleFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by christianbartram on 2/8/18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * AdvancedRule
 *
 * Advanced rule extends the AbstractRule class and provides an implementation
 * for Advanced Rules which require not only the rules name but also another value which corresponds
 * to the rules name in order to enforce the validation on the HTTP field.
 *
 *
 * Example {name: max:50} Max is the Rules name but its an advanced rule which also requires the value 50
 * to enforce that the name field can only be a maximum length of 50 characters.
 *
 * @author Christian Bartram
 */
var AdvancedRule = function (_AbstractRule) {
    _inherits(AdvancedRule, _AbstractRule);

    function AdvancedRule(name) {
        var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var activationFunction = arguments[3];

        _classCallCheck(this, AdvancedRule);

        var _this = _possibleConstructorReturn(this, (AdvancedRule.__proto__ || Object.getPrototypeOf(AdvancedRule)).call(this, name));

        _this.activationFunction = activationFunction;
        _this.name = name;
        _this.req = req;
        _this.value = value;
        return _this;
    }

    /**
     * Returns true if the rule is required (same as active for a basic rule)
     * @returns {boolean}
     */


    _createClass(AdvancedRule, [{
        key: 'isRequired',
        value: function isRequired() {
            return this.req === true;
        }

        /**
         * Returns the rule type
         * @returns {string}
         */

    }, {
        key: 'getType',
        value: function getType() {
            return "ADVANCED";
        }

        /**
         * Sets required attribute
         * @param req Boolean
         */

    }, {
        key: 'setReq',
        value: function setReq(req) {
            if (typeof req === "boolean") {
                this.req = req;
            } else {
                throw new Error("Req must be of type boolean");
            }
        }

        /**
         * Adds an additional reason why this
         * rule failed to the stack
         * @param name
         * @param key
         * @param field
         * @param value
         */

    }, {
        key: 'addReason',
        value: function addReason(name, key, field, value) {
            //Create a "Stack Trace/ValidationError" object
            var error = new _ValidationError2.default(key, _RuleFactory2.default.getRule(name));

            //Set the error message
            error.setWhy(field + _ErrorCode2.default.codes()[name.toUpperCase()] + value);

            //Update the encapsulated value
            _get(AdvancedRule.prototype.__proto__ || Object.getPrototypeOf(AdvancedRule.prototype), 'setWhy', this).call(this, error.getError());
        }

        /**
         * Formats the reason why the Http request failed
         * @returns {string}
         */

    }, {
        key: 'reason',
        value: function reason() {
            return _get(AdvancedRule.prototype.__proto__ || Object.getPrototypeOf(AdvancedRule.prototype), 'getWhy', this).call(this);
        }

        /**
         * Returns true if the rule failed and false otherwise
         * @param field
         * @param value
         * @returns {boolean}
         */

    }, {
        key: 'failed',
        value: function failed(field, value) {
            return this.activationFunction(field, value) === false;
        }

        /**
         * Returns true if the rule failed and false otherwise
         * @param field
         * @param value
         * @param request
         * @returns {boolean}
         */

    }, {
        key: 'failed',
        value: function failed(field, value, request) {
            return this.activationFunction(field, value, request) === false;
        }

        /**
         * Returns the activation function for the advanced rule
         * @returns {*}
         */

    }, {
        key: 'getActivationFunction',
        value: function getActivationFunction() {
            return this.activationFunction;
        }

        /**
         * Returns the required attribute
         * @returns {*}
         */

    }, {
        key: 'getReq',
        value: function getReq() {
            return this.req;
        }

        /**
         * Sets the value of the advanced rule
         * @param value
         */

    }, {
        key: 'setValue',
        value: function setValue(value) {
            this.value = value;
        }

        /**
         * Returns the advanced rules value
         * @returns {*}
         */

    }, {
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }

        /**
         * Returns the name of the Rule from the superclass
         * @returns {*}
         */

    }, {
        key: 'getName',
        value: function getName() {
            return _get(AdvancedRule.prototype.__proto__ || Object.getPrototypeOf(AdvancedRule.prototype), 'getName', this).call(this);
        }

        /**
         * Returns the advanced rule object implementation
         * as a javascript object
         * @returns {{name: *, req: *, value: *}}
         */

    }, {
        key: 'getRule',
        value: function getRule() {
            return {
                name: this.name,
                req: this.req,
                value: this.value
            };
        }
    }]);

    return AdvancedRule;
}(_AbstractRule3.default);

exports.default = AdvancedRule;