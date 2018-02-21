"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by christian bartram on 2/6/18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * todo Short circuit validation option, multiple nested layers for json
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Parser = require("./parser/Parser");

var _Parser2 = _interopRequireDefault(_Parser);

var _RuleFactory = require("./rule/RuleFactory");

var _RuleFactory2 = _interopRequireDefault(_RuleFactory);

var _ErrorCode = require("./error/ErrorCode");

var _ErrorCode2 = _interopRequireDefault(_ErrorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Validator
 *
 * Provides an entry point into the Library
 * and validates each set of parsed rules
 *
 * @author Christian Bartram
 */
var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, null, [{
        key: "add",


        /**
         * Adds a custom rule to be validated
         * @param name String rules name
         * @param errorString String The reason why the rule failed
         * @param rule Rule object <? extends CustomRule>
         */
        value: function add(rule) {
            _RuleFactory2.default.init();
            _ErrorCode2.default.init();
            _RuleFactory2.default.addRule(rule.getName().toUpperCase(), rule.getErrorMsg(), rule);
        }

        /**
         * Parses the validation rules
         * and enforces the rules on the HTTP Request
         * @param data Object
         * @returns Function {initialize}
         */

    }, {
        key: "make",
        value: function make(data) {
            return function initialize(req, res, next) {

                //If there was not a custom rule added init methods before any processing takes place
                if (!_RuleFactory2.default.isInitialized() && !_ErrorCode2.default.isInitialized()) {
                    _RuleFactory2.default.init();
                    _ErrorCode2.default.init();

                    console.log("Initialized RuleFactory and Error Codes");
                    console.log(_RuleFactory2.default.rules());
                } else {
                    console.log(_RuleFactory2.default.rules());
                }

                _RuleFactory2.default.init();
                _ErrorCode2.default.init();

                //Add 2 variables to the request
                req.valid = false;
                req.why = "";

                var parsedRules = _Parser2.default.parse(data);
                var failedRules = [];

                //Validate the data

                var _loop = function _loop(key) {
                    var body = req.body[key]; //HTTP Request Body
                    var rules = parsedRules[key]; //Array of Rules to enforce

                    rules.forEach(function (rule) {
                        //Check each rule against the value given in the HTTP Request body
                        if (rule.getType() === "ADVANCED") {
                            //Some rules require an HTTP request object to be validated
                            switch (rule.getName()) {
                                case "SAME":
                                case "DIFFERENT":
                                    if (rule.failed(body, rule.getValue(), req)) {
                                        rule.addReason(rule.getName(), key, body, rule.getValue());
                                        failedRules.push(rule);
                                    }
                                    break;
                                default:
                                    //Its just a normal advanced rule
                                    if (rule.failed(body, rule.getValue())) {
                                        rule.addReason(rule.getName(), key, body, rule.getValue());
                                        failedRules.push(rule);
                                    }

                            }
                        } else {
                            //Basic Rule
                            if (rule.failed(body)) {
                                rule.addReason(rule.getName(), key, body);
                                failedRules.push(rule);
                            }
                        }
                    });
                };

                for (var key in parsedRules) {
                    _loop(key);
                }

                //Evaluate list of errors
                failedRules.length > 0 ? req.valid = false : req.valid = true;
                req.failed = failedRules;
                next();
            };
        }
    }]);

    return Validator;
}();

exports.default = Validator;
;