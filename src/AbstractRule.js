/**
 * Created by christianbartram on 2/8/18.
 */

let name;

export default class Rule {

    constructor(name) {
        this.name = name;
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

    getRule() {
        throw new Error("This method requires implementation before use.")
    }

}