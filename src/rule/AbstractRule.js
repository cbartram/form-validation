/**
 * Created by christianbartram on 2/8/18.
 */

export default class Rule {

    constructor(name, why) {
        this.name = name;
        this.why = why;
    }

    getType() {
        throw Error("This method requires implementation before use")
    }

    setName(name) {
        if(name.length !== 0) {
            this.name = name.toUpperCase();
        } else {
            throw Error("Rule Name cannot be blank")
        }
    }

    setWhy(why) {
        this.why = why;
    }

    getWhy() {
        return this.why;
    }

    getName() {
        return this.name;
    }

    getRule() {
        throw new Error("This method requires implementation before use.")
    }

    getActivationFunction() {
        throw new Error("This method requires implementation before use.")
    }

}