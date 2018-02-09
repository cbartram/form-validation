/**
 * Created by christianbartram on 2/8/18.
 */

let name, req, value;

class Rule {

    constructor(name, req = false, value = 0) {
        this.name = name;
        this.req = req;
        this.value = value;
    }

    getRule() {



        return {
            name: name,
        }
    }

    setName(name) {
        if(name.length !== 0) {
            this.name = name.toUpperCase();
        } else {
            throw Error("Rule Name cannot be blank")
        }
    }

    getName() {
        return this.name;
    }

    setReq(req) {
        this.req = req;
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

}