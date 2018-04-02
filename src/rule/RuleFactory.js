/**
 * Created by Christian Bartram
 * Simple function to return a Rules enum
 * stating the results of the parse
 */
import BasicRule from './BasicRule';
import AdvancedRule from './AdvancedRule';
import Util from '../Util';
import validator from 'validator';
import moment from 'moment';
import CustomRule from "./CustomRule";

/**
 * Rules Class
 * @desc Collection of all of the Advanced  and Basic Rule constructors
 * @author Cbartram
 */
export default class RuleFactory {

    static init() {
        this.isInitialized = true;
        this.r = {
            ALPHANUMERIC: new BasicRule("ALPHANUMERIC", false, (field) => validator.isAlphanumeric(field + "", 'en-US')),
            AFTER: new AdvancedRule("AFTER", false, 0, (field, value) => moment(field, "YYYY-MM-DD").isAfter(value)),
            AFTER_OR_EQUAL: new AdvancedRule("AFTER_OR_EQUAL", false, 0,  (field, value) => moment(field).isSameOrAfter(value)),
            ARRAY: new BasicRule("ARRAY", false,(field) => Array.isArray(field)),
            ALPHA: new BasicRule("ALPHA", false, (field) => validator.isAlpha(field + "", 'en-US')),
            BOOLEAN: new BasicRule("BOOLEAN", false, (field) => validator.isBoolean(field + "")),
            BEFORE: new AdvancedRule("BEFORE", false, 0, (field, value) => moment(field).isBefore(value)),
            BEFORE_OR_EQUAL: new AdvancedRule("BEFORE_OR_EQUAL", false, 0, (field, value) => moment(field).isSameOrBefore(value)),
            BETWEEN: new AdvancedRule("BETWEEN", false, [0, 0], (field, value) => Util.isBetween(field, value[0], value[1])),
            CREDIT_CARD: new BasicRule("CREDIT_CARD", false, (field) => validator.isCreditCard(field + "")),
            DATE: new BasicRule("DATE", false, (field) => validator.toDate(field) !== null),
            DATE_EQUALS: new AdvancedRule("DATE_EQUALS", false, 0, (field, value) => moment(field).isSame(value)),
            DATE_FORMAT: new AdvancedRule("DATE_FORMAT", false, 0, (field, value) =>  moment(field, value).isValid()),
            DIFFERENT: new AdvancedRule("DIFFERENT", false, 0, (field, value, req) => field !== req.body[value]),
            DIGITS: new AdvancedRule("DIGITS", false, 0, (field, value) => (validator.isNumeric(field + "") && field.length === parseInt(value))),
            DISTINCT: new BasicRule("DISTINCT", false, (field) => (!Util.hasDuplicates(field) && Array.isArray(field))),
            EMAIL: new BasicRule("EMAIL", false, (field) => validator.isEmail(field + "")),
            FILLED: new BasicRule("FILLED", false, (field) => !Util.isNullOrUndefined(field)),
            INCLUDES: new AdvancedRule("INCLUDES", false, [], (field, value) => Array.isArray(field) && field.some(r => value.includes(r))),
            INTEGER: new BasicRule("INTEGER", false, (field) => validator.isInt(field + "")),
            IP: new BasicRule("IP", false, (field) => validator.isIP(field + "")),
            IPV4: new BasicRule("IPV4", false, (field) => validator.isIP(field + "", 4)),
            IPV6: new BasicRule("IPV6", false, (field) => validator.isIP(field + "", 6)),
            JSON: new BasicRule("JSON", false, (field) => validator.isJSON(field + "")),
            MAX: new AdvancedRule("MAX", false, 0, (field, value) => field.length < parseInt(value)),
            MIN: new AdvancedRule("MIN", false, 0, (field, value) => field.length >= value),
            NULLABLE: new BasicRule("NULLABLE", false,  (field) => true),
            NUMERIC: new BasicRule("NUMERIC", false, (field) => validator.isNumeric(field + "")),
            NOT_IN: new AdvancedRule("NOT_IN", false, [], (field, value) => field.some(r => !value.includes(r))),
            REQUIRED: new BasicRule("REQUIRED", false, (field) => typeof field !== 'undefined'),
            REGEX: new AdvancedRule("REGEX", false, 0, (field, value) => new RegExp(value).test(field)),
            SIZE: new AdvancedRule("SIZE", false, 0, (field, value) => parseInt(value) === field.length),
            SAME: new AdvancedRule("SAME", false, 0, (field, value, req) => (req.body[value] === field)),
            STRING: new BasicRule("STRING", false, (field) => (typeof field === "string")),
        }
    }


    static isInit() {
        return this.isInitialized;
    }

    /**
     * Creates instances of each rule uniquely with an anonymous inner function
     * which returns true if the rule passes validation and false otherwise
     * @return Object
     */
    static rules() {
      return {
          ALPHANUMERIC: new BasicRule("ALPHANUMERIC", false, (field) => validator.isAlphanumeric(field + "", 'en-US')),
          AFTER: new AdvancedRule("AFTER", false, 0, (field, value) => moment(field, "YYYY-MM-DD").isAfter(value)),
          AFTER_OR_EQUAL: new AdvancedRule("AFTER_OR_EQUAL", false, 0,  (field, value) => moment(field).isSameOrAfter(value)),
          ARRAY: new BasicRule("ARRAY", false,(field) => Array.isArray(field)),
          ALPHA: new BasicRule("ALPHA", false, (field) => validator.isAlpha(field + "", 'en-US')),
          BOOLEAN: new BasicRule("BOOLEAN", false, (field) => validator.isBoolean(field + "")),
          BEFORE: new AdvancedRule("BEFORE", false, 0, (field, value) => moment(field).isBefore(value)),
          BEFORE_OR_EQUAL: new AdvancedRule("BEFORE_OR_EQUAL", false, 0, (field, value) => moment(field).isSameOrBefore(value)),
          BETWEEN: new AdvancedRule("BETWEEN", false, [0, 0], (field, value) => Util.isBetween(field, value[0], value[1])),
          CREDIT_CARD: new BasicRule("CREDIT_CARD", false, (field) => validator.isCreditCard(field + "")),
          DATE: new BasicRule("DATE", false, (field) => validator.toDate(field) !== null),
          DATE_EQUALS: new AdvancedRule("DATE_EQUALS", false, 0, (field, value) => moment(field).isSame(value)),
          DATE_FORMAT: new AdvancedRule("DATE_FORMAT", false, 0, (field, value) =>  moment(field, value).isValid()),
          DIFFERENT: new AdvancedRule("DIFFERENT", false, 0, (field, value, req) => field !== req.body[value]),
          DIGITS: new AdvancedRule("DIGITS", false, 0, (field, value) => (validator.isNumeric(field + "") && field.length === parseInt(value))),
          DISTINCT: new BasicRule("DISTINCT", false, (field) => (!Util.hasDuplicates(field) && Array.isArray(field))),
          EMAIL: new BasicRule("EMAIL", false, (field) => validator.isEmail(field + "")),
          FILLED: new BasicRule("FILLED", false, (field) => !Util.isNullOrUndefined(field)),
          INCLUDES: new AdvancedRule("INCLUDES", false, [], (field, value) => Array.isArray(field) && field.some(r => value.includes(r))),
          INTEGER: new BasicRule("INTEGER", false, (field) => validator.isInt(field + "")),
          IP: new BasicRule("IP", false, (field) => validator.isIP(field + "")),
          IPV4: new BasicRule("IPV4", false, (field) => validator.isIP(field + "", 4)),
          IPV6: new BasicRule("IPV6", false, (field) => validator.isIP(field + "", 6)),
          JSON: new BasicRule("JSON", false, (field) => validator.isJSON(field + "")),
          MAX: new AdvancedRule("MAX", false, 0, (field, value) => field.length < parseInt(value)),
          MIN: new AdvancedRule("MIN", false, 0, (field, value) => field.length >= value),
          NULLABLE: new BasicRule("NULLABLE", false, (field) => field === null || typeof field === "undefined"),
          NUMERIC: new BasicRule("NUMERIC", false, (field) => validator.isNumeric(field + "")),
          NOT_IN: new AdvancedRule("NOT_IN", false, [], (field, value) => field.some(r => !value.includes(r))),
          REQUIRED: new BasicRule("REQUIRED", false, (field) => typeof field !== 'undefined'),
          REGEX: new AdvancedRule("REGEX", false, 0, (field, value) => new RegExp(value).test(field)),
          SIZE: new AdvancedRule("SIZE", false, 0, (field, value) => parseInt(value) === field.length),
          SAME: new AdvancedRule("SAME", false, 0, (field, value, req) => (req.body[value] === field)),
          STRING: new BasicRule("STRING", false, (field) => (typeof field === "string")),
      }
    }

    /**
     * Adds an additional rules to the rules object
     * @param name String the name of the rule
     * @param rule Rule object extending
     */
    static addRule(name, rule) {
        if(rule instanceof CustomRule) {
            console.log("Adding rule", rule.getName());
            this.rules[name.toUpperCase()] = rule;
        } else {
            throw new Error("Rule does not implement required super class: CustomRule")
        }
    }

    /**
     * Returns a specific rule given its name
     * @param name String rule name
     * @returns {*} Object AbstractRule
     */
    static getRule(name) {
        if(this.rules()[name] !== null && typeof this.rules()[name] !== 'undefined') {
            return this.rules()[name];
        } else {
            throw Error("That rule could not be found or does not exist!")
        }
    }
};