/**
 * Created by christianbartram on 2/8/18.
 */
import Rule from './AbstractRule';
import ErrorCode from '../error/ErrorCode';

export default class AdvancedRule extends Rule {
    constructor(name, req = false, value = 0, activationFunction, shouldBail = false) {
        super(name);
        this.activationFunction = activationFunction;
        this.name = name;
        this.req = req;
        this.value = value;
        this.shouldBail = shouldBail;
    }

    isRequired() {
        return this.req === true;
    }

    getType() {
        return "ADVANCED"
    }

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
     */
    addReason(name) {
        let why = super.getWhy();
        why.push(ErrorCode.codes()[name.toUpperCase()]);
        super.setWhy(why);
    }

    /**
     * Formats the reason why the Http request failed
     * @param field
     * @param value
     * @returns {string}
     */
    reason(field, value) {
       return  `Key -> ${field}${super.getWhy()}${value}`;
    }

    failed(field, value) {
        return this.activationFunction(field, value) === false;
    }

    failed(field, value, request) {
        return this.activationFunction(field, value, request) === false;
    }

    getActivationFunction() {
        return this.activationFunction;
    }

    getReq() {
        return this.req;
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    getName() {
        return super.getName();
    }

    getRule() {
        return {
            name: this.name,
            req: this.req,
            value: this.value
        }
    }

    bail() {
        return this.shouldBail;
    }
}