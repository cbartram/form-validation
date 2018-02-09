/**
 * Created by christianbartram on 2/8/18.
 */
import Rule from './AbstractRule';

let active;

export default class BasicRule extends Rule {
    constructor(name, active = false) {
        super(name);
        this.active = active;
    }

    setActive(active) {
        if(typeof active === "boolean") {
            this.active = active;
        } else {
            throw new Error("Active must be of type Boolean");
        }
    }

    isActive() {
        return active === true;
    }

    getName() {
        return super.getName();
    }


    getRule() {
        return {
            name,
            active
        }
    }

}