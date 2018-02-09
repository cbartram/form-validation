/**
 * Created by christianbartram on 2/8/18.
 */
import Rule from './AbstractRule';

let name, req, value;

export default class AdvancedRule extends Rule {
    constructor(name, req = false, value = 0) {
        super(name);

        this.name = name;
        this.req = req;
        this.value = value;
    }

    isRequired() {
        return req === true;
    }

    setReq(req) {
        if(typeof req === "boolean") {
            this.req = req;
        } else {
            throw new Error("Req must be of type boolean")
        }
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
            name,
            req,
            value
        }
    }
}