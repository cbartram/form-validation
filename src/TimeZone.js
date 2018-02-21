import CustomRule from "./rule/CustomRule";
import RuleFactory from "./rule/RuleFactory";
import ErrorCode from "./error/ErrorCode";
import ValidationError from "./error/ValidationError";


export default class TimeZone extends CustomRule {
    constructor(name, req = false, activationFunction, errorString) {
        super(name, req);

        this.activationFunction = activationFunction;
        this.errorString = errorString;
    }


    getErrorMsg() {
        return this.errorString;
    }

    /**
     * Returns the type of Rule that is being implemented
     * @return String rule type
     */
    getType() {
        return "BASIC"
    }

    /**
     * Overloaded method which adds a reason to the why array
     * @param name String name
     * @param key String
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

    /**
     * Abstract method implemented returns an object representation of
     * the rule
     */
    getRule() {
        return {
            name: super.getName(),
            req: super.getReq()
        }
    }

    /**
     * Abstract method which returns the activation function for the rule
     * @return function
     */
    getActivationFunction() {
       return this.activationFunction;
    }
}