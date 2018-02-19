/**
 * Created by christianbartram on 2/8/18.
 */
import AbstractRule from './AbstractRule';
import ErrorCode from '../error/ErrorCode';

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
    constructor(name, req = false, value = 0, activationFunction, shouldBail = false) {
        super(name);
        this.activationFunction = activationFunction;
        this.name = name;
        this.req = req;
        this.value = value;
        this.shouldBail = shouldBail;
    }

    /**
     * Returns true if the rule is required (same as active for a basic rule)
     * @returns {boolean}
     */
    isRequired() {
        return this.req === true;
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
        if(typeof req === "boolean") {
            this.req = req;
        } else {
            throw new Error("Req must be of type boolean")
        }
    }

    /**
     * Adds an additional reason why this
     * rule failed to the stack
     * @param name
     * @param field
     * @param value
     */
    addReason(name, field, value) {
        let why = super.getWhy();
        why.push(field + ErrorCode.codes()[name.toUpperCase()] + value);
        super.setWhy(why);
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
        return this.req;
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

    /**
     * Returns true if the script should stop
     *  validating after this rule fails
     * @returns {boolean|*}
     */
    bail() {
        return this.shouldBail;
    }
}