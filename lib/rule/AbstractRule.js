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
  function AbstractRule(name) {
    _classCallCheck(this, AbstractRule);

    this.name = name;
    this.why = []; //Holds reason(s) why validation failed
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
     * Abstract method which returns a boolean of wether to bail after a
     * failed validation
     */

  }, {
    key: "bail",
    value: function bail() {
      throw new Error("This method requires implementation before use.");
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     */

  }, {
    key: "failed",
    value: function failed(field) {}

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     * @param value
     */

  }, {
    key: "failed",
    value: function failed(field, value) {}

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     * @param value
     * @param req Express request object
     */

  }, {
    key: "failed",
    value: function failed(field, value, req) {}
  }]);

  return AbstractRule;
}();

exports.default = AbstractRule;