/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
import Parser from './parser/Parser';
import RuleFactory from "./rule/RuleFactory";
import ErrorCode from "./error/ErrorCode";

/**
 * Validator
 *
 * Provides an entry point into the Library
 * and validates each set of parsed rules
 *
 * @author Christian Bartram
 */
export default class Validator {
    /**
     * Adds a custom rule to be validated
     * @param rule Rule object <? extends CustomRule>
     */
    static add(rule) {
        RuleFactory.init();
        ErrorCode.init();
        RuleFactory.addRule(rule.getName().toUpperCase(), rule.getErrorMsg(), rule);
    }

    /**
     * Parses the validation rules
     * and enforces the rules on the HTTP Request
     * @param data Object
     * @returns Function {initialize}
     */
    static make(data) {
        return function initialize(req, res, next) {

            //TODO Unit tests dont run because rules are never init'd figure out a way to
            //todo not need to init them so that if a custom rule is added a single "rules" object is updated
            //todo and all references to RuleFactory.rules() reference the rules with the new custom rule
            //todo if more than one custom rule is added RuleFactory needs to keep adding those rules to a stack
            //todo but RuleFactory.rules() must always return either the basic set of rules OR the custom set + basic set but NEVER null
            //If there was not a custom rule added init methods before any processing takes place
          //  if(!RuleFactory.isInitialized() && !ErrorCode.isInitialized()) {
                RuleFactory.init();
                ErrorCode.init();
          //  }

            //Add 2 variables to the request
            req.valid = false;
            req.why = "";

            let parsedRules = Parser.parse(data);
            let failedRules = [];

            //Validate the data
            for(let key in parsedRules) {
                let body = req.body[key]; //HTTP Request Body
                let rules = parsedRules[key]; //Array of Rules to enforce

                rules.forEach(rule => {
                    //Check each rule against the value given in the HTTP Request body
                    if(rule.getType() === "ADVANCED") {
                        //Some rules require an HTTP request object to be validated
                        switch(rule.getName()) {
                            case "SAME":
                            case "DIFFERENT":
                                if(rule.failed(body, rule.getValue(), req)) {
                                    rule.addReason(rule.getName(), key, body, rule.getValue());
                                    failedRules.push(rule);
                                }
                                break;
                            default:
                                //Its just a normal advanced rule
                                if (rule.failed(body, rule.getValue())) {
                                    rule.addReason(rule.getName(), key, body, rule.getValue());
                                    failedRules.push(rule);
                                }

                        }
                    } else {
                        //Basic Rule
                        if(rule.failed(body)) {
                            rule.addReason(rule.getName(), key, body);
                            failedRules.push(rule);
                        }
                    }
                });
            }

            //Evaluate list of errors
            failedRules.length > 0 ? req.valid = false : req.valid = true;
            req.failed = failedRules;
            next();
        };
    }
};
