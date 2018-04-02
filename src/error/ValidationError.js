/**
 * Error
 *
 * Class creating the error object used to reference what failed
 * during the validation process.
 *
 * {
 *      name: NUMERIC
 *      key: 'age',
 *      rule: [Rule Object]
 *      why: "age must be a numerical value [0-9]"
 *  }
 *
 * @author christian bartram
 */
export default class ValidationError {
    /**
     * Creates a new Error Object
     * @param key
     * @param rule
     */
    constructor(key, rule) {
        this.key = key;
        this.rule = rule;
        this.why = "";
    }

    setWhy(why) {
        this.why = why;
    }

    getWhy() {
        return this.why;
    }

    getRule() {
       return this.rule;
    }


    getError() {
        return this.why
    }
}