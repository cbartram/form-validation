/**
 * Created by christianbartram on 2/8/18.
 */
import Rule from './AbstractRule';


export default class BasicRule extends Rule {
    constructor(name, req = false, why = "", activationFunction, type) {
        super(name, why, type);
        this.req = req;
        this.why = why;
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