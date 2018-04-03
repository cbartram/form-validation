import AbstractRule from './AbstractRule';
import RuleFactory from './RuleFactory'
import ValidationError from "../error/ValidationError";
import ErrorCode from "../error/ErrorCode";

/**
 * Custom Rule
 *
 * @author Christian Bartram
 */
export default class CustomRule extends AbstractRule {
    constructor(name = "CustomRule", required = false, activationFunction, errorMessage = "") {
        super(name, required);
        this.activationFunction = activationFunction;
    }

    getType() {
        throw new Error("This method requires implementation before use")
    }

    /**
     * Adds an additional reason why this BASIC rule failed to the stack
     * @param value
     * @param key
     * @param field
     */
    addReason(key, field, value) {
        //Create a "Stack Trace/ValidationError" object
        let error = new ValidationError(key, RuleFactory.getRule(this.name));

        //Set the error message
        error.setWhy(field + ErrorCode.codes()[this.name.toUpperCase()] + value);

        //Update the encapsulated value
        super.setWhy(error.getError());
    }

    addReason(key, field) {
        //Create a "Stack Trace/ValidationError" object
        let error = new ValidationError(key, RuleFactory.getRule(this.name));

        //Set the error message
        error.setWhy(field + ErrorCode.codes()[this.name.toUpperCase()]);

        //Update the encapsulated value
        super.setWhy(error.getError());
    }


    getWhy() {
        return super.getWhy();
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     */
    failed(field) {
        return this.activationFunction(field) === false;
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     * @param value
     */
    failed(field, value) {
        return this.activationFunction(field, value) === false;
    }

    /**
     * Returns true if the validation fails and false otherwise
     * @param field
     * @param value
     * @param req Express HTTP request object
     */
    failed(field, value, req) {
        return this.activationFunction(field, value, req) === false;
    }

}