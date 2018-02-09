/**
 * Created by Christian Bartram
 * Simple function to return a Rules enum
 * stating the results of the parse
 */
module.exports = {

    add(name, req = false, value = 0) {

    },

    customRules() {

    },

    rules() {
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