import CustomRule from "./rule/CustomRule";
import RuleFactory from "./rule/RuleFactory";
import ValidationError from "./error/ValidationError";
import ErrorCode from "./error/ErrorCode";


export default class Timezone extends CustomRule {
    constructor(name, req = false, activationFunction) {
        super(name, req);

        this.activationFunction = activationFunction;
    }

    getType() {
        return "BASIC"
    }

    failed(field) {
        return this.activationFunction
    }

    getActivationFunction() {

    }

    /**
     * Adds an additional reason why this
     * rule failed to the stack
     * @param name
     * @param key
     * @param field
     */
    addReason(name, key, field) {
        //Create a "Stack Trace/ValidationError" object
        let error = new ValidationError(key, RuleFactory.getRule(name));

        //Set the error message
        error.setWhy(field + ErrorCode.codes()[name.toUpperCase()]);

        //Update the encapsulated value
        super.setWhy(error.getError());
    }

    reason() {
        super.getWhy();
    }
}