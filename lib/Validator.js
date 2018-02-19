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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, null, [{
        key: "make",


        /**
         * Parses the validation rules
         * and enforces the rules on the HTTP Request
         * @param data Object
         * @returns {initialize}
         */
        value: function make(data) {
            return function initialize(req, res, next) {
                //Add 2 variables to the request
                req.valid = false;
                req.why = "";

                var parsedRules = _Parser2.default.parse(data);

                //Validate the data

                var _loop = function _loop(key) {
                    var body = req.body[key]; //HTTP Request Body
                    var rules = parsedRules[key]; //Array of Rules to enforce

                    rules.forEach(function (rule, iterator) {
                        //Check each rule against the value given in the HTTP Request body
                        if (rule.getType() === "ADVANCED") {

                            //Some rules require an HTTP request object to be validated
                            switch (rule.getName()) {
                                case "SAME":
                                case "DIFFERENT":
                                    if (rule.failed(body, rule.getValue(), req)) {
                                        rule.addReason(rule.getName(), body, rule.getValue());
                                        req.valid = false;
                                        req.why = rule.reason();
                                        next();
                                    }
                                    break;
                                default:
                                    //Its just a normal advanced rule
                                    if (rule.failed(body, rule.getValue())) {
                                        console.log("ADVANCED RULE", rule.getName() + " FAILED FOR " + key);
                                        rule.addReason(rule.getName(), body, rule.getValue());

                                        //todo Bail after the first error
                                        req.valid = false;
                                        req.why = rule.reason();
                                        next();
                                    }

                            }
                        } else {
                            //Basic Rule
                            if (rule.failed(body)) {
                                console.log("BASIC RULE", rule.getName() + " FAILED FOR " + key);
                                rule.addReason(rule.getName(), body);
                                req.valid = false;
                                req.why = rule.reason();
                                next();
                            }
                        }
                    });
                };

                for (var key in parsedRules) {
                    _loop(key);
                }

                req.valid = true;
                next();
            };
        }
    }]);

    return Validator;
}();

exports.default = Validator;
;