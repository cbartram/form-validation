'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractRule2 = require('./AbstractRule');

var _AbstractRule3 = _interopRequireDefault(_AbstractRule2);

var _RuleFactory = require('./RuleFactory');

var _RuleFactory2 = _interopRequireDefault(_RuleFactory);

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

    function CustomRule(name, req) {
        _classCallCheck(this, CustomRule);

        return _possibleConstructorReturn(this, (CustomRule.__proto__ || Object.getPrototypeOf(CustomRule)).call(this, name, req));
    }

    _createClass(CustomRule, [{
        key: 'getType',
        value: function getType() {
            throw new Error("This method requires implementation before use");
        }
    }, {
        key: 'addReason',
        value: function addReason() {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         */

    }, {
        key: 'failed',
        value: function failed(field) {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         * @param value
         */

    }, {
        key: 'failed',
        value: function failed(field, value) {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         * @param value
         * @param req Express request object
         */

    }, {
        key: 'failed',
        value: function failed(field, value, req) {
            throw new Error("This method requires implementation before use");
        }
    }]);

    return CustomRule;
}(_AbstractRule3.default);

exports.default = CustomRule;