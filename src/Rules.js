/**
 * Created by Christian Bartram
 * Simple function to return a Rules enum
 * stating the results of the parse
 */
import BasicRule from './BasicRule';
import AdvancedRule from './AdvancedRule';
import Util from './Util';
import Type from './Type';
import validator from 'validator';
import moment from 'moment';

/**
 * Rules Class
 * @desc Houses all of the Rule definitions
 * @author Cbartram
 */
export default class Rules {

    static rules() {
      return {
          //Create each rule uniquely with an anonymous inner function
         ALPHANUMERIC: new BasicRule("ALPHANUMERIC", false, ": must be alphanumeric.", (field) => validator.isAlphanumeric(field + "", 'en-US'), Type.BASIC),
          //Must be ISO example: 2013-05-05 todo perhaps add more flexibility here e.g. after:tomorrow
         AFTER: new AdvancedRule("AFTER", false, 0, " was expected to be chronologically after ", (field, value) => moment(field).isAfter(value), Type.ADVANCED),
         AFTER_OR_EQUAL: new AdvancedRule("AFTER_OR_EQUAL", false, 0, " was expected to be chronologically after or chronologically identical to ", (field, value) => moment(field).isSameOrAfter(value), Type.ADVANCED),
         ARRAY: new BasicRule("ARRAY", false, ": must be an array", (field) => Array.isArray(field), Type.BASIC),
         ALPHA: new BasicRule("ALPHA", false, " must be an alpha value [A-Z][a-z]", (field) => validator.isAlpha(field + "", 'en-US'), Type.BASIC),
         BOOLEAN: new BasicRule("BOOLEAN", false, ": must be of type boolean.", (field) => validator.isBoolean(field + ""), Type.BASIC),
         BEFORE: new AdvancedRule("BEFORE", false, 0, "was expected to be chronologically before", (field, value) => moment(field).isBefore(value), Type.ADVANCED),
         BEFORE_OR_EQUAL: new AdvancedRule("BEFORE_OR_EQUAL", false, 0, " must be chronologically before or chronologically equal to ", (field, value) => moment(field).isSameOrBefore(value), Type.ADVANCED),
         BETWEEN: new AdvancedRule("BETWEEN", false, [0, 0], " must be contained in the set ", (field, value) => Util.isBetween(field, value[0], value[1]), Type.ADVANCED),
         CREDIT_CARD: new BasicRule("CREDIT_CARD", false, " must be a valid credit card.", (field) => validator.isCreditCard(field), Type.BASIC),
         DATE: new BasicRule("DATE", false, ": must be a valid Javascript Date.", (field) => validator.toDate(field) !== null, Type.BASIC),
         DATE_EQUALS: new AdvancedRule("DATE_EQUALS", false, 0, "was expected to be chronologically equal to ", (field, value) => moment(field).isSame(value), Type.ADVANCED),
         DATE_FORMAT: new AdvancedRule("DATE_FORMAT", false, 0, " was expected to be in a moment JS compatible date.", (field, value) =>  moment(field, value).isValid(), Type.ADVANCED),
         DIFFERENT: new AdvancedRule("DIFFERENT", false, 0, " was expected to be a different value from ", (field, value, req) => field !== req.body[value], Type.ADVANCED),
         DIGITS: new AdvancedRule("DIGITS", false, 0, " was expected to be numeric and of the length -> ", (field, value) => (validator.isNumeric(field) || field.length === parseInt(value)), Type.ADVANCED),
         DISTINCT: new BasicRule("DISTINCT", false, " must not contain any duplicates and must also be of type Array ", (field) => (!Util.hasDuplicates(field) || Array.isArray(field)), Type.BASIC),
         EMAIL: new BasicRule("EMAIL", false, " must be a valid email address ", (field) => validator.isEmail(field), Type.BASIC),
         FILLED: new BasicRule("FILLED", false, "", (field) => !Util.isNullOrUndefined(field), Type.BASIC),
         INCLUDES: new AdvancedRule("INCLUDES", false, [], " is missing one or more of the following value(s): ", (field, value) => field.some(r => value.includes(r)), Type.ADVANCED),
         INTEGER: new BasicRule("INTEGER", false, " must be of type Integer.", (field) => validator.isInt(field), Type.BASIC),
         IP: new BasicRule("IP", false, " is must be a valid IPV4 or IPV6 address ", (field) => validator.isIP(field), Type.BASIC),
         IPV4: new BasicRule("IPV4", false, " must be a valid IPV4 address ", (field) => validator.isIP(field, 4), Type.BASIC),
         IPV6: new BasicRule("IPV6", false, " must be a valid IPV6 address ", (field) => validator.isIP(field, 6), Type.BASIC),
         //todo Doesnt work or im giving it the wrong input idk
         JSON: new BasicRule("JSON", false, " is must be a valid JSON ", (field) => validator.isJSON(field), Type.BASIC),
         MAX: new AdvancedRule("MAX", false, 0, " : must not be greater than the specified value: ", (field, value) => field.length < parseInt(value), Type.ADVANCED),
         MIN: new AdvancedRule("MIN", false, 0, " The key exceeds the minimum length -> ", (field, value) => field >= value),
         NULLABLE: new BasicRule("NULLABLE", false, "", (field) => true, Type.BASIC),
         NUMERIC: new BasicRule("NUMERIC", false, ": must be numerical.", (field) => validator.isNumeric(field + ""), Type.BASIC),
         NOT_IN: new AdvancedRule("NOT_IN", false, [], (field, value) => field.some(r => !value.includes(r)), Type.ADVANCED),
         REQUIRED: new BasicRule("REQUIRED", false, ": must not be undefined", (field) => typeof field !== 'undefined', Type.BASIC),
         REGEX: new AdvancedRule("REGEX", false, 0, " does not match the given regular expression. ", (field, value) => new RegExp(value).test(field)),
         SIZE: new AdvancedRule("SIZE", false, 0, ` was expected to be of size: `, (field, value) => parseInt(value) === field.length, Type.ADVANCED),
         SAME: new AdvancedRule("SAME", false, 0, "must match the value for the field: ", (field, value, req) => (req.body[value] === field), Type.ADVANCED),
         STRING: new BasicRule("STRING", false, " was expected to be of type String.", (field) => (typeof field !== "string"), Type.BASIC),
      }
    }

    static getRule(name) {
        if(this.rules()[name] !== null && typeof this.rules()[name] !== 'undefined') {
            return this.rules()[name];
        } else {
            throw Error("That rule could not be found or does not exist!")
        }
    }
};