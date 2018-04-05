'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Christian Bartram
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Simple function to return a Rules enum
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * stating the results of the parse
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _BasicRule = require('./BasicRule');

var _BasicRule2 = _interopRequireDefault(_BasicRule);

var _AdvancedRule = require('./AdvancedRule');

var _AdvancedRule2 = _interopRequireDefault(_AdvancedRule);

var _Util = require('../Util');

var _Util2 = _interopRequireDefault(_Util);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _CustomRule = require('./CustomRule');

var _CustomRule2 = _interopRequireDefault(_CustomRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Rules Class
 * @desc Collection of all of the Advanced  and Basic Rule constructors
 * @author Cbartram
 */
var RuleFactory = function () {
    function RuleFactory() {
        _classCallCheck(this, RuleFactory);
    }

    _createClass(RuleFactory, null, [{
        key: 'init',
        value: function init() {
            this.r = {
                ALPHANUMERIC: new _BasicRule2.default("ALPHANUMERIC", false, function (field) {
                    return _validator2.default.isAlphanumeric(field + "", 'en-US');
                }),
                AFTER: new _AdvancedRule2.default("AFTER", false, 0, function (field, value) {
                    return (0, _moment2.default)(field, "YYYY-MM-DD").isAfter(value);
                }),
                AFTER_OR_EQUAL: new _AdvancedRule2.default("AFTER_OR_EQUAL", false, 0, function (field, value) {
                    return (0, _moment2.default)(field).isSameOrAfter(value);
                }),
                ARRAY: new _BasicRule2.default("ARRAY", false, function (field) {
                    return Array.isArray(field);
                }),
                ARRAY_SIZE: new _AdvancedRule2.default("ARRAY_SIZE", false, function (field, value) {
                    return field.length === parseInt(value);
                }),
                ALPHA: new _BasicRule2.default("ALPHA", false, function (field) {
                    return _validator2.default.isAlpha(field + "", 'en-US');
                }),
                BOOLEAN: new _BasicRule2.default("BOOLEAN", false, function (field) {
                    return _validator2.default.isBoolean(field + "");
                }),
                BEFORE: new _AdvancedRule2.default("BEFORE", false, 0, function (field, value) {
                    return (0, _moment2.default)(field).isBefore(value);
                }),
                BEFORE_OR_EQUAL: new _AdvancedRule2.default("BEFORE_OR_EQUAL", false, 0, function (field, value) {
                    return (0, _moment2.default)(field).isSameOrBefore(value);
                }),
                BETWEEN: new _AdvancedRule2.default("BETWEEN", false, [0, 0], function (field, value) {
                    return _Util2.default.isBetween(field, value[0], value[1]);
                }),
                CREDIT_CARD: new _BasicRule2.default("CREDIT_CARD", false, function (field) {
                    return _validator2.default.isCreditCard(field + "");
                }),
                DATE: new _BasicRule2.default("DATE", false, function (field) {
                    return _validator2.default.toDate(field) !== null;
                }),
                DATE_EQUALS: new _AdvancedRule2.default("DATE_EQUALS", false, 0, function (field, value) {
                    return (0, _moment2.default)(field).isSame(value);
                }),
                DATE_FORMAT: new _AdvancedRule2.default("DATE_FORMAT", false, 0, function (field, value) {
                    return (0, _moment2.default)(field, value).isValid();
                }),
                DIFFERENT: new _AdvancedRule2.default("DIFFERENT", false, 0, function (field, value, req) {
                    return field !== req.body[value];
                }),
                DIGITS: new _AdvancedRule2.default("DIGITS", false, 0, function (field, value) {
                    return _validator2.default.isNumeric(field + "") && field.length === parseInt(value);
                }),
                DISTINCT: new _BasicRule2.default("DISTINCT", false, function (field) {
                    return !_Util2.default.hasDuplicates(field) && Array.isArray(field);
                }),
                EMAIL: new _BasicRule2.default("EMAIL", false, function (field) {
                    return _validator2.default.isEmail(field + "");
                }),
                FILLED: new _BasicRule2.default("FILLED", false, function (field) {
                    return !_Util2.default.isNullOrUndefined(field);
                }),
                INCLUDES: new _AdvancedRule2.default("INCLUDES", false, [], function (field, value) {
                    return Array.isArray(field) && field.some(function (r) {
                        return value.includes(r);
                    });
                }),
                INTEGER: new _BasicRule2.default("INTEGER", false, function (field) {
                    return _validator2.default.isInt(field + "");
                }),
                IP: new _BasicRule2.default("IP", false, function (field) {
                    return _validator2.default.isIP(field + "");
                }),
                IPV4: new _BasicRule2.default("IPV4", false, function (field) {
                    return _validator2.default.isIP(field + "", 4);
                }),
                IPV6: new _BasicRule2.default("IPV6", false, function (field) {
                    return _validator2.default.isIP(field + "", 6);
                }),
                JSON: new _BasicRule2.default("JSON", false, function (field) {
                    return _validator2.default.isJSON(field + "");
                }),
                MAX: new _AdvancedRule2.default("MAX", false, 0, function (field, value) {
                    return field.length < parseInt(value);
                }),
                MIN: new _AdvancedRule2.default("MIN", false, 0, function (field, value) {
                    return field.length >= value;
                }),
                NULLABLE: new _BasicRule2.default("NULLABLE", false, function (field) {
                    return field === null || field.length === 0;
                }),
                NUMERIC: new _BasicRule2.default("NUMERIC", false, function (field) {
                    return _validator2.default.isNumeric(field + "");
                }),
                NOT_IN: new _AdvancedRule2.default("NOT_IN", false, [], function (field, value) {
                    return field.some(function (r) {
                        return !value.includes(r);
                    });
                }),
                REQUIRED: new _BasicRule2.default("REQUIRED", false, function (field) {
                    return typeof field !== 'undefined';
                }),
                REGEX: new _AdvancedRule2.default("REGEX", false, 0, function (field, value) {
                    return new RegExp(value).test(field);
                }),
                SIZE: new _AdvancedRule2.default("SIZE", false, 0, function (field, value) {
                    return parseInt(value) === field.length;
                }),
                SAME: new _AdvancedRule2.default("SAME", false, 0, function (field, value, req) {
                    return req.body[value] === field;
                }),
                STRING: new _BasicRule2.default("STRING", false, function (field) {
                    return typeof field === "string";
                })
            };

            this.ruleKeys = Object.keys(this.r);
        }

        /**
         * Returns true if the rule is a custom rule
         * and false otherwise
         * @param name String rule name
         */

    }, {
        key: 'isCustomRule',
        value: function isCustomRule(name) {
            //Ensure the original rule keys do not include the custom rule
            //And assert that the rule is custom
            return !this.ruleKeys.includes(name.toUpperCase());
        }

        /**
         * Returns true if the rules are initializes and false otherwise
         * @returns {boolean}
         */

    }, {
        key: 'isInit',
        value: function isInit() {
            try {
                return Object.keys(this.r).length >= 34;
            } catch (e) {
                return false;
            }
        }

        /**
         * Creates instances of each rule uniquely with an anonymous inner function
         * which returns true if the rule passes validation and false otherwise
         * @return Object
         */

    }, {
        key: 'rules',
        value: function rules() {
            return this.r;
        }

        /**
         * Adds an additional rules to the rules object
         * @param rule Rule object extending
         */

    }, {
        key: 'addRule',
        value: function addRule(rule) {
            if (rule instanceof _CustomRule2.default) {
                this.r[rule.getName().toUpperCase()] = rule;
            } else {
                throw new Error("Rule does not implement required super class: CustomRule");
            }
        }

        /**
         * Returns a specific rule given its name
         * @param name String rule name
         * @returns {*} Object AbstractRule
         */

    }, {
        key: 'getRule',
        value: function getRule(name) {
            //Convert name to uppercase because all rules are stored as uppercase keys
            name = name.toUpperCase();
            if (this.rules()[name] !== null && typeof this.rules()[name] !== 'undefined') {
                return this.rules()[name];
            } else {
                throw Error("That rule could not be found or does not exist!");
            }
        }
    }]);

    return RuleFactory;
}();

exports.default = RuleFactory;
;