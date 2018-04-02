"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AbstractRule
 *
 * This class provides the abstract implementation of a Rule
 * that can be enforced
 * @author Christian Bartram
 */
var AbstractRule = function () {
    function AbstractRule(name, req) {
        _classCallCheck(this, AbstractRule);

        this.req = req;
        this.name = name;
        this.why = [];
        this.key = []; //The key in the request object this rule is associated with
    }

    /**
     * Returns the type of Rule that is being implemented
     * @return String rule type
     */


    _createClass(AbstractRule, [{
        key: "getType",
        value: function getType() {
            throw Error("This method requires implementation before use");
        }

        /**
         * Sets the rules name. Names are automatically converted to Upper Case
         * @param name String rule name
         */

    }, {
        key: "setName",
        value: function setName(name) {
            if (name.length !== 0) {
                this.name = name.toUpperCase();
            } else {
                throw Error("Rule Name cannot be blank");
            }
        }

        /**
         * Sets the Why array for reasons why the validation failed
         * @param why
         */

    }, {
        key: "setWhy",
        value: function setWhy(why) {
            this.why = why;
        }

        /**
         * Returns the Why array
         * @returns {Array|*}
         */

    }, {
        key: "getWhy",
        value: function getWhy() {
            return this.why;
        }

        /**
         * Returns true if the rule is required
         * @param req Boolean
         * @returns Boolean
         */

    }, {
        key: "setReq",
        value: function setReq(req) {
            if (typeof req === "boolean") {
                this.req = req;
            } else {
                throw new Error("Req must be of type boolean");
            }
        }

        /**
         * Returns the required property
         * @returns Boolean
         */

    }, {
        key: "getReq",
        value: function getReq() {
            return this.req;
        }

        /**
         * Returns the key of the request object this rule is associated with
         * @returns {Array}
         */

    }, {
        key: "getKey",
        value: function getKey() {
            return this.key;
        }

        /**
         * Returns true if the property is required and false otherwise
         */

    }, {
        key: "isRequired",
        value: function isRequired() {
            return this.req === true;
        }
    }, {
        key: "reason",
        value: function reason() {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Overloaded method which adds a reason to the why array
         * @param name String name
         * @param field
         */

    }, {
        key: "addReason",
        value: function addReason(name, field) {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Adds a reason to the why array
         * @param name
         * @param field
         * @param value
         */

    }, {
        key: "addReason",
        value: function addReason(name, field, value) {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Returns the name of the rule
         * @returns {*}
         */

    }, {
        key: "getName",
        value: function getName() {
            return this.name.toUpperCase();
        }

        /**
         * Abstract method implemented returns an object representation of
         * the rule
         */

    }, {
        key: "getRule",
        value: function getRule() {
            throw new Error("This method requires implementation before use.");
        }

        /**
         * Abstract method which returns the activation function for the rule
         * @return function
         */

    }, {
        key: "getActivationFunction",
        value: function getActivationFunction() {
            throw new Error("This method requires implementation before use.");
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         */

    }, {
        key: "failed",
        value: function failed(field) {
            throw new Error("This method requires implementation before use");
        }

        /**
         * Returns true if the validation fails and false otherwise
         * @param field
         * @param value
         */

    }, {
        key: "failed",
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
        key: "failed",
        value: function failed(field, value, req) {
            throw new Error("This method requires implementation before use");
        }
    }]);

    return AbstractRule;
}();

exports.default = AbstractRule;