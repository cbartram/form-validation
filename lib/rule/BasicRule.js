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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by christianbartram on 2/8/18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * BasicRule
 *
 * This class extends abstract rule and overrides several methods
 * to implement a rule that can be satisfied with a boolean value.
 *
 * Basic Rules are rules that can be validated with only their name and
 * require no data from the HTTP Request
 * @author Christian Bartram
 */
var BasicRule = function (_AbstractRule) {
    _inherits(BasicRule, _AbstractRule);

    function BasicRule(name) {
        var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var activationFunction = arguments[2];
        var shouldBail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        _classCallCheck(this, BasicRule);

        var _this = _possibleConstructorReturn(this, (BasicRule.__proto__ || Object.getPrototypeOf(BasicRule)).call(this, name));

        _this.req = req;
        _this.activationFunction = activationFunction;
        _this.shouldBail = shouldBail;
        return _this;
    }

    /**
     * Sets the rule to active. In the list of Rules
     * @param active
     */


    _createClass(BasicRule, [{
        key: 'setActive',
        value: function setActive(active) {
            if (typeof active === "boolean") {
                this.active = active;
            } else {
                throw new Error("Active must be of type Boolean");
            }
        }

        /**
         * Returns true if the activation function fails
         * false otherwise
         * @param field field to pass to the activation function
         * @returns {boolean}
         */

    }, {
        key: 'failed',
        value: function failed(field) {
            return this.activationFunction(field) === false;
        }

        /**
         * Adds an additional reason why this
         * rule failed to the stack
         * @param name
         * @param field
         */

    }, {
        key: 'addReason',
        value: function addReason(name, field) {
            var why = _get(BasicRule.prototype.__proto__ || Object.getPrototypeOf(BasicRule.prototype), 'getWhy', this).call(this);
            why.push(field + _ErrorCode2.default.codes()[name.toUpperCase()]);
            _get(BasicRule.prototype.__proto__ || Object.getPrototypeOf(BasicRule.prototype), 'setWhy', this).call(this, why);
        }

        /**
         * Implements the abstract rules, getType() function to return
         * a string value of BASIC
         * @returns {string}
         */

    }, {
        key: 'getType',
        value: function getType() {
            return "BASIC";
        }

        /**
         * Retrieves the reason for this Rules failure from
         * its superclass
         * @returns {Array|*}
         */

    }, {
        key: 'reason',
        value: function reason() {
            return _get(BasicRule.prototype.__proto__ || Object.getPrototypeOf(BasicRule.prototype), 'getWhy', this).call(this);
        }

        /**
         * Returns true if the rule is active and being enforced to the HTTP
         * request and false otherwise
         * @returns {boolean}
         */

    }, {
        key: 'isActive',
        value: function isActive() {
            return this.req === true;
        }

        /**
         * Returns the activation functions
         * wrapper function to be called
         * @returns {*}
         */

    }, {
        key: 'getActivationFunction',
        value: function getActivationFunction() {
            return this.activationFunction;
        }

        /**
         * Implements method from its superclass and
         * returns an object representation of a BasicRule
         * @returns {{name: *, req: boolean|*}}
         */

    }, {
        key: 'getRule',
        value: function getRule() {
            return {
                name: this.name,
                req: this.req
            };
        }

        /**
         * Returns true if the rule should stop validating other rules
         * if this rule fails and false otherwise.
         * @returns {boolean|*}
         */

    }, {
        key: 'bail',
        value: function bail() {
            return this.shouldBail;
        }
    }]);

    return BasicRule;
}(_AbstractRule3.default);

exports.default = BasicRule;