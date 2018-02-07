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
            SIZE: {req: false, value: 0}
        };
    }
};