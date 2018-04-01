"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorCode = function () {
    function ErrorCode() {
        _classCallCheck(this, ErrorCode);
    }

    _createClass(ErrorCode, null, [{
        key: "codes",
        value: function codes() {
            return {
                ALPHANUMERIC: ": must be alphanumeric.",
                AFTER: " was expected to be chronologically after ",
                AFTER_OR_EQUAL: " was expected to be chronologically after or chronologically identical to ",
                ARRAY: ": must be an array",
                ALPHA: " must be an alpha value [A-Z][a-z]",
                BOOLEAN: ": must be of type boolean.",
                BEFORE: "was expected to be chronologically before",
                BEFORE_OR_EQUAL: " must be chronologically before or chronologically equal to ",
                BETWEEN: " must be contained in the set ",
                CREDIT_CARD: " must be a valid credit card.",
                DATE: ": must be a valid Javascript Date.",
                DATE_EQUALS: "was expected to be chronologically equal to ",
                DATE_FORMAT: " was expected to be in a moment JS compatible date.",
                DIFFERENT: " was expected to be a different value from ",
                DIGITS: " was expected to be numeric and of the length -> ",
                DISTINCT: " must not contain any duplicates and must also be of type Array ",
                EMAIL: " must be a valid email address ",
                FILLED: " must be present in the request body",
                INCLUDES: " is missing one or more of the following value(s): ",
                INTEGER: " must be of type Integer.",
                IP: " is must be a valid IPV4 or IPV6 address ",
                IPV4: " must be a valid IPV4 address ",
                IPV6: " must be a valid IPV6 address ",
                JSON: " is must be a valid JSON ",
                MAX: " : must not be greater than the specified value: ",
                MIN: " The key exceeds the minimum length -> ",
                NULLABLE: "",
                NUMERIC: ": must be numerical.",
                NOT_IN: " the specified value must NOT be in the set",
                REQUIRED: ": must not be undefined",
                REGEX: " does not match the given regular expression. ",
                SIZE: " was expected to be of size: ",
                SAME: "must match the value for the field: ",
                STRING: " was expected to be of type String."
            };
        }
    }]);

    return ErrorCode;
}();

exports.default = ErrorCode;