"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CustomRule2 = require("./rule/CustomRule");

var _CustomRule3 = _interopRequireDefault(_CustomRule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timezone = function (_CustomRule) {
    _inherits(Timezone, _CustomRule);

    function Timezone(name, activationFunction, errorMessage) {
        var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, Timezone);

        var _this = _possibleConstructorReturn(this, (Timezone.__proto__ || Object.getPrototypeOf(Timezone)).call(this, name, activationFunction, errorMessage, value));

        _this.name = name;
        _this.errorMessage = errorMessage;
        _this.activationFunction = activationFunction;
        _this.value = value;
        return _this;
    }

    _createClass(Timezone, [{
        key: "getName",
        value: function getName() {
            return this.name;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.value;
        }
    }, {
        key: "getErrorMessage",
        value: function getErrorMessage() {
            return this.errorMessage;
        }
    }, {
        key: "getType",
        value: function getType() {
            return "ADVANCED";
        }
    }]);

    return Timezone;
}(_CustomRule3.default);

exports.default = Timezone;