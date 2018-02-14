/**
 * Created by christianbartram on 2/8/18.
 */
import Rule from './AbstractRule';
import ErrorCode from '../error/ErrorCode';


export default class BasicRule extends Rule {
    constructor(name, req = false, activationFunction) {
        super(name);
        this.req = req;
        this.activationFunction = activationFunction;
    }

    setActive(active) {
        if(typeof active === "boolean") {
            this.active = active;
        } else {
            throw new Error("Active must be of type Boolean");
        }
    }

    failed(field) {
        return this.activationFunction(field) === false;
    }

    /**
     * Adds an additional reason why this
     * rule failed to the stack
     * @param name
     */
    addReason(name) {

    }

    getType() {
        return "BASIC";
    }

    reason(field) {
        return `${field} ${this.getWhy()}`;
    }

    isActive() {
        return this.req === true;
    }

    getActivationFunction() {
       return this.activationFunction;
    }

    getRule() {
        return {
            name: this.name,
            req: this.req
        }
    }

}