/**
 * AbstractRule
 *
 * This class provides the abstract implementation of a Rule
 * that can be enforced
 * @author Christian Bartram
 */
export default class AbstractRule {
    constructor(name) {
        this.name = name;
        this.why = null;
    }

    /**
     * Returns the type of Rule that is being implemented
     * @return String rule type
     */
    getType() {
        throw Error("This method requires implementation before use")
    }

    /**
     * Sets the rules name. Names are automatically converted to Upper Case
     * @param name String rule name
     */
    setName(name) {
        if(name.length !== 0) {
            this.name = name.toUpperCase();
        } else {
            throw Error("Rule Name cannot be blank")
        }
    }

    /**
     * Sets the Why array for reasons why the validation failed
     * @param why
     */
    setWhy(why) {
        this.why = why;
    }

    /**
     * Returns the Why array
     * @returns {Array|*}
     */
    getWhy() {
        return this.why;
    }

    /**
     * Overloaded method which adds a reason to the why array
     * @param name String name
     * @param field
     */
    addReason(name, field) {
        throw new Error("This method requires implementation before use")
    }

    /**
     * Adds a reason to the why array
     * @param name
     * @param field
     * @param value
     */
    addReason(name, field, value) {
        throw new Error("This method requires implementation before use")
    }

    /**
     * Returns the name of the rule
     * @returns {*}
     */
    getName() {
        return this.name.toUpperCase();
    }

    /**
     * Abstract method implemented returns an object representation of
     * the rule
     */
    getRule() {
        throw new Error("This method requires implementation before use.")
    }

    /**
     * Abstract method which returns the activation function for the rule
     * @return function
     */
    getActivationFunction() {
        throw new Error("This method requires implementation before use.")
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     */
    failed(field) {
        throw new Error("This method requires implementation before use")
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     * @param value
     */
    failed(field, value) {
        throw new Error("This method requires implementation before use")
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     * @param value
     * @param req Express request object
     */
    failed(field, value, req) {
        throw new Error("This method requires implementation before use")
    }

}