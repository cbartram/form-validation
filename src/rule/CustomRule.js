import AbstractRule from './AbstractRule';
import RuleFactory from './RuleFactory'

/**
 * Custom Rule
 *
 * @author Christian Bartram
 */
export default class CustomRule extends AbstractRule {
    constructor(name, req) {
        super(name, req);
    }

    getType() {
        throw new Error("This method requires implementation before use")
    }

    addReason() {
        throw new Error("This method requires implementation before use")
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