"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Error
 *
 * Class creating the error object used to reference what failed
 * during the validation process.
 *
 * {
 *      name: NUMERIC
 *      key: 'age',
 *      rule: [Rule Object]
 *      why: "age must be a numerical value [0-9]"
 *  }
 *
 * @author christian bartram
 */
var ValidationError = function () {
    /**
     * Creates a new Error Object
     * @param key
     * @param rule
     */
    function ValidationError(key, rule) {
        _classCallCheck(this, ValidationError);

        this.key = key;
        this.rule = rule;
        this.why = "";
    }

    _createClass(ValidationError, [{
        key: "setWhy",
        value: function setWhy(why) {
            this.why = why;
        }
    }, {
        key: "getWhy",
        value: function getWhy() {
            return this.why;
        }
    }, {
        key: "getRule",
        value: function getRule() {
            return this.rule;
        }
    }, {
        key: "getError",
        value: function getError() {
            return {
                name: this.rule.getName(),
                key: this.key,
                why: this.why
            };
        }
    }]);

    return ValidationError;
}();

exports.default = ValidationError;