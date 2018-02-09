/**
 * Created by Christian Bartram
 * Simple function to return a Rules enum
 * stating the results of the parse
 */
import BasicRule from './BasicRule';
import AdvancedRule from './AdvancedRule';

export default class Rules {

    static rules() {
      return {
         ALPHANUMERIC: new BasicRule("ALPHANUMERIC", false),
         AFTER: new AdvancedRule("AFTER", false, 0),
         AFTER_OR_EQUAL: new AdvancedRule("AFTER_OR_EQUAL", false, 0),
         ARRAY: new BasicRule("ARRAY", false),
         ALPHA: new BasicRule("ALPHA", false),
         BOOLEAN: new BasicRule("BOOLEAN", false),
         BEFORE: new AdvancedRule("BEFORE", false, 0),
         BEFORE_OR_EQUAL: new AdvancedRule("BEFORE_OR_EQUAL", false, 0),
         BETWEEN: new AdvancedRule("BETWEEN", false, [0, 0]),
         CONFIRMED: new BasicRule("CONFIRMED", false),
         CREDIT_CARD: new BasicRule("CREDIT_CARD", false),
         DATE: new BasicRule("DATE", false),
         DATE_EQUALS: new AdvancedRule("DATE_EQUALS", false, 0),
         DATE_FORMAT: new AdvancedRule("DATE_FORMAT", false, 0),
         DIFFERENT: new AdvancedRule("DIFFERENT", false, 0),
         DIGITS: new AdvancedRule("DIGITS", false, 0),
         DISTINCT: new BasicRule("DISTINCT", false),
         EMAIL: new BasicRule("EMAIL", false),
         FILLED: new BasicRule("FILLED", false),
         INCLUDES: new AdvancedRule("INCLUDES", false, []),
         INTEGER: new BasicRule("INTEGER", false),
         IP: new BasicRule("IP", false),
         IPV4: new BasicRule("IPV4", false),
         IPV6: new BasicRule("IPV6", false),
         JSON: new BasicRule("JSON", false),
         MAX: new AdvancedRule("MAX", false, 0),
         MIN: new AdvancedRule("MIN", false, 0),
         NULLABLE: new BasicRule("NULLABLE", false),
         NUMERIC: new BasicRule("NULLABLE", false),
         NOT_IN: new AdvancedRule("NOT_IN", false, []),
         REQUIRED: new BasicRule("REQUIRED", false),
         REGEX: new AdvancedRule("REGEX", false, 0),
         SIZE: new AdvancedRule("SIZE", false, 0),
         SAME: new AdvancedRule("SAME", false, 0),
         STRING: new BasicRule("STRING", false),
      }
    }

   static rulesAsObject() {
        return {
            ALPHANUMERIC: false,
            AFTER: {req: false, value: 0},
            AFTER_OR_EQUAL: {req: false, value: 0},
            ARRAY: false,
            ALPHA: false,
            BOOLEAN: false,
            BEFORE: {req: false, value: 0},
            BEFORE_OR_EQUAL: {req: false, value: 0},
            BETWEEN:{req: false, value:[0, 0]}, //this one is unique and requires a special case to parse
            CONFIRMED:false,
            CREDIT_CARD: false,
            DATE: false,
            DATE_EQUALS: {req: false, value: 0},
            DATE_FORMAT: {req: false, value: 0},
            DIFFERENT: {req: false, value: 0},
            DIGITS: {req: false, value: 0},
            DISTINCT: false,
            EMAIL: false,
            FILLED: false,
            INCLUDES:{req: false, value:[]},
            INTEGER: false,
            IP:false,
            IPV4: false,
            IPV6: false,
            JSON: false,
            MAX: {req: false, value: 0},
            MIN: {req: false, value: 0},
            NULLABLE: false,
            NUMERIC: false,
            NOT_IN: {req: false, value: []},
            REQUIRED: false,
            REGEX: {req: false, value: 0},
            SIZE: {req: false, value: 0},
            SAME: {req: false, value:0},
            STRING: false,
            CUSTOM_RULES: []
        };
    }
};