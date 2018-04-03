import CustomRule from "./rule/CustomRule";
import RuleFactory from "./rule/RuleFactory";
import ValidationError from "./error/ValidationError";
import ErrorCode from "./error/ErrorCode";


export default class Timezone extends CustomRule {
    constructor(name = "Timezone", activationFunction, errorMessage, value = null) {
        super(name, activationFunction, errorMessage);
        this.name = name;
        this.errorMessage = errorMessage;
        this.activationFunction = activationFunction;
        this.value = value;
    }

    getName() {
        return this.name
    }

    getValue() {
        return this.value;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    getType() {
        return "ADVANCED"
    }
}