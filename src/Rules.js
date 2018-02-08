/**
 * Created by Christian Bartram
 * Simple function to return a Rules enum
 * stating the results of the parse
 */
module.exports = {
    rules() {
        return {
            REQUIRED: false,
            ARRAY: false,
            MAX: {req: false, value: 0},
            NUMERIC: false,
            DATE: false,
            BOOLEAN: false,
            ALPHANUMERIC: false,
            SIZE: {req: false, value: 0},
            AFTER: {req: false, value: 0},
            AFTER_OR_EQUAL: {req: false, value: 0},
            ALPHA: false,
            BEFORE: {req: false, value: 0},
            BEFORE_OR_EQUAL: {req: false, value: 0},
            BETWEEN:{req: false, value:[0, 0]}, //this one is unique and requires a special case to parse
            CONFIRMED:false,
            DATE_EQUALS: {req: false, value: 0},
            DATE_FORMAT: {req: false, value: 0},
            DIFFERENT: {req: false, value: 0},
            DIGITS: {req: false, value: 0},
            DISTINCT: false,
            EMAIL: false,
            FILLED: false,
            INCLUDES:{req: false, value:[]}
        };
    }
};