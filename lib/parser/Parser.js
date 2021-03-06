"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RuleFactory = require("../rule/RuleFactory");

var _RuleFactory2 = _interopRequireDefault(_RuleFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created By Christian Bartram
 * This class parses the rules given as arguments to the parse() method
 * into a readable object
 *
 * @param data rules data coming from the HTTP request
 * @return Object
 */
var Parser = function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
        key: "parse",


        /**
         * Parses string data for each field into usable javascript object
         * @param data Request body as JSON
         * @returns {Object}
         */
        value: function parse(data) {
            //Get rules definitions from rules class
            var rules = _RuleFactory2.default.rules();
            var shouldBail = false;
            var obj = {};

            var _loop = function _loop(key) {
                //ex obj[MAX] = [AdvancedRule(), BasicRule(), BasicRule(), AdvancedRule()]
                if (data.hasOwnProperty(key)) {
                    obj[key] = [];
                }

                if (data.hasOwnProperty(key)) {
                    var arr = data[key].split("|");

                    //arr => ['max:50', 'after:1994-01-01', 'required']
                    arr.forEach(function (element) {

                        element.toUpperCase() === "BAIL" ? shouldBail = true : null;

                        //If the element includes a value instead of a boolean
                        if (element.includes(":")) {

                            //example: element:value -> max:50
                            var value = element.substr(element.indexOf(":") + 1, element.length);
                            element = element.substr(0, element.indexOf(":"));

                            //Parse between, includes, and not_in differently
                            if (element === "between" || element === "includes" || element === "not_in") {
                                var _arr = value.split(",");
                                rules[element.toUpperCase()].req = true;
                                rules[element.toUpperCase()].value = _arr;
                                rules[element.toUpperCase()].key.push(key);
                            } else {
                                rules[element.toUpperCase()].req = true;
                                rules[element.toUpperCase()].value = value;
                                rules[element.toUpperCase()].key.push(key);
                            }
                        } else {
                            rules[element.toUpperCase()].req = true;
                            rules[element.toUpperCase()].key.push(key);
                        }
                    });
                }
            };

            for (var key in data) {
                _loop(key);
            }

            //For each of the parsed rules

            var _loop2 = function _loop2(parsed) {
                if (rules[parsed].req) {

                    //Find out which key in obj this rule applies to
                    rules[parsed].getKey().forEach(function (key) {
                        obj[key] = [];
                        //Push the parsed rule onto the objects arr at the key position
                        obj[key].push(rules[parsed]);
                    });
                }
            };

            for (var parsed in rules) {
                _loop2(parsed);
            }
            return obj;
        }
    }]);

    return Parser;
}();

exports.default = Parser;
;