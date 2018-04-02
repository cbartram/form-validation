/**
 * Created by christianbartram on 2/8/18.
 */
import AbstractRule from './AbstractRule';
import RuleFactory from './RuleFactory';
import ErrorCode from '../error/ErrorCode';
import ValidationError from "../error/ValidationError";


/**
 * BasicRule
 *
 * This class extends abstract rule and overrides several methods
 * to implement a rule that can be satisfied with a boolean value.
 *
 * Basic Rules are rules that can be validated with only their name and
 * require no data from the HTTP Request
 * @author Christian Bartram
 */
export default class BasicRule extends AbstractRule {
    constructor(name, req = false, activationFunction) {
        super(name, req);
        this.req = req;
        this.activationFunction = activationFunction;
        this.key = super.getKey();
    }

    /**
     * Sets the rule to active. In the list of Rules
     * @param req
     */
    setReq(req) {
        super.setReq(req)
    }

    /**
     * Returns true if the activation function fails
     * false otherwise
     * @param field field to pass to the activation function
     * @returns {boolean}
     */
    failed(field) {
        return this.activationFunction(field) === false;
    }

    /**
     * Adds an additional reason why this
     * rule failed to the stack
     * @param name
     * @param key
     * @param field
     */
    addReason(name, key, field) {
        //Create a "Stack Trace/ValidationError" object
        let error = new ValidationError(key, RuleFactory.getRule(name));

        //Set the error message
        error.setWhy(field + ErrorCode.codes()[name.toUpperCase()]);

        //Update the encapsulated value
        super.setWhy(error.getError());
    }

    /**
     * Implements the abstract rules, getType() function to return
     * a string value of BASIC
     * @returns {string}
     */
    getType() {
        return "BASIC";
    }

    /**
     * Returns the super class's key of the request object this
     * rule is associated with
     * @returns {null}
     */
    getKey() {
        return super.getKey();
    }

    /**
     * Retrieves the reason for this Rules failure from
     * its superclass
     * @returns {Array|*}
     */
    reason() {
        return super.getWhy();
    }

    /**
     * Returns true if the rule is active and being enforced to the HTTP
     * request and false otherwise
     * @returns {boolean}
     */
    isRequired() {
       return super.isRequired()
    }

    /**
     * Returns the activation functions
     * wrapper function to be called
     * @returns {*}
     */
    getActivationFunction() {
       return this.activationFunction;
    }

    /**
     * Implements method from its superclass and
     * returns an object representation of a BasicRule
     * @returns {{name: *, req: boolean|*}}
     */
    getRule() {
        return {
            name: this.name,
            req: this.req
        }
    }

}