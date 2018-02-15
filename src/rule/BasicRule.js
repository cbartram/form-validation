/**
 * Created by christianbartram on 2/8/18.
 */
import AbstractRule from './AbstractRule';
import ErrorCode from '../error/ErrorCode';


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
    constructor(name, req = false, activationFunction, shouldBail = false) {
        super(name);
        this.req = req;
        this.activationFunction = activationFunction;
        this.shouldBail = shouldBail;
    }

    /**
     * Sets the rule to active. In the list of Rules
     * @param active
     */
    setActive(active) {
        if(typeof active === "boolean") {
            this.active = active;
        } else {
            throw new Error("Active must be of type Boolean");
        }
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
     */
    addReason(name, field) {
        let why = super.getWhy();
        why.push(field + ErrorCode.codes()[name.toUpperCase()]);
        super.setWhy(why);
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
    isActive() {
        return this.req === true;
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

    /**
     * Returns true if the rule should stop validating other rules
     * if this rule fails and false otherwise.
     * @returns {boolean|*}
     */
    bail() {
        return this.shouldBail;
    }

}