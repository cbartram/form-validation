import CustomRule from "./rule/CustomRule";

export default class Timezone extends CustomRule {
    constructor(name, activationFunction, errorMessage, value = null) {
        super(name, activationFunction, errorMessage, value);
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