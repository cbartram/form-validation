/**
 * Created by christianbartram on 2/8/18.
 */
import AbstractRule from './AbstractRule';
import ErrorCode from '../error/ErrorCode';
import ValidationError from '../error/ValidationError';
import RuleFactory from './RuleFactory';

/**
 * AdvancedRule
 *
 * Advanced rule extends the AbstractRule class and provides an implementation
 * for Advanced Rules which require not only the rules name but also another value which corresponds
 * to the rules name in order to enforce the validation on the HTTP field.
 *
 *
 * Example {name: max:50} Max is the Rules name but its an advanced rule which also requires the value 50
 * to enforce that the name field can only be a maximum length of 50 characters.
 *
 * @author Christian Bartram
 */
export default class AdvancedRule extends AbstractRule {
    constructor(name, req = false, value = 0, activationFunction) {
        super(name, req);
        this.activationFunction = activationFunction;
        this.name = name;
        this.req = req;
        this.value = value;
        this.key = super.getKey();
    }

    /**
     * Returns true if the rule is required (same as active for a basic rule)
     * @returns {boolean}
     */
    isRequired() {
        return super.isRequired()
    }

    /**
     * Returns the rule type
     * @returns {string}
     */
    getType() {
        return "ADVANCED"
    }

    /**
     * Sets required attribute
     * @param req Boolean
     */
    setReq(req) {
        super.setReq(req);
    }

    /**
     * Adds an additional reason why this
     * rule failed to the stack
     * @param key
     * @param field
     * @param value
     */
    addReason(key, field) {
        //Create a "Stack Trace/ValidationError" object
        let error = new ValidationError(key, RuleFactory.getRule(this.name));

        //Set the error message
        error.setWhy(field + ErrorCode.codes()[this.name.toUpperCase()] + this.value);

        //Update the encapsulated value
        super.setWhy(error.getError());
    }

    /**
     * Formats the reason why the Http request failed
     * @returns {string}
     */
    reason() {
       return super.getWhy();
    }

    /**
     * Returns true if the rule failed and false otherwise
     * @param field
     * @param value
     * @returns {boolean}
     */
    failed(field, value) {
        return this.activationFunction(field, value) === false;
    }

    /**
     * Returns true if the rule failed and false otherwise
     * @param field
     * @param value
     * @param request
     * @returns {boolean}
     */
    failed(field, value, request) {
        return this.activationFunction(field, value, request) === false;
    }

    /**
     * Returns the activation function for the advanced rule
     * @returns {*}
     */
    getActivationFunction() {
        return this.activationFunction;
    }

    /**
     * Returns the required attribute
     * @returns {*}
     */
    getReq() {
        return super.getReq();
    }

    /**
     * Returns the Array of http request keys this rule
     * applies to
     * @returns {Array}
     */
    getKey() {
        return super.getKey();
    }

    /**
     * Sets the value of the advanced rule
     * @param value
     */
    setValue(value) {
        this.value = value;
    }

    /**
     * Returns the advanced rules value
     * @returns {*}
     */
    getValue() {
        return this.value;
    }

    /**
     * Returns the name of the Rule from the superclass
     * @returns {*}
     */
    getName() {
        return super.getName();
    }

    /**
     * Returns the advanced rule object implementation
     * as a javascript object
     * @returns {{name: *, req: *, value: *}}
     */
    getRule() {
        return {
            name: this.name,
            req: this.req,
            value: this.value
        }
    }
}