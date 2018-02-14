/**
 * Created by christianbartram on 2/8/18.
 */
import Rule from './AbstractRule';

export default class AdvancedRule extends Rule {
    constructor(name, req = false, value = 0, why, activationFunction) {
        super(name, why);
        this.why = why;
        this.activationFunction = activationFunction;
        this.name = name;
        this.req = req;
        this.value = value;
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
     * Formats the reason why the Http request failed
     * @param field
     * @param value
     * @returns {string}
     */
    reason(field, value) {
        return  `${field} ${this.why} ${value}`
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
}