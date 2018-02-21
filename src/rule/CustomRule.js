import AbstractRule from "./AbstractRule";


export default class CustomRule extends AbstractRule {
    constructor(name, req = false) {
        super(name, req);
    }

    getErrorMsg() {
        throw Error("This method requires implementation before use")
    }

    /**
     * Returns the type of Rule that is being implemented
     * @return String rule type
     */
    getType() {
        throw Error("This method requires implementation before use")
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

}