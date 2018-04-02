/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
import Parser from './parser/Parser';
import RuleFactory from "./rule/RuleFactory";

/**
 * Validator
 *
 * Provides an entry point into the Library
 * and validates each set of parsed rules
 *
 * @author Christian Bartram
 */
export default class Validator {
    static addCustomRule(rule) {
        //Init the Rules
        RuleFactory.init();
        RuleFactory.addRule(rule.getName(), rule);
    }

    /**
     * Parses the validation rules
     * and enforces the rules on the HTTP Request
     * @param data Object
     * @returns Function {initialize}
     */
    static make(data) {
        return function initialize(req, res, next) {
            //Init rules
            RuleFactory.init();

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
                                if(typeof body === "undefined" || body === null) {
                                    rule.addReason(key, body, rule.getValue());
                                    failedRules.push(rule);
                                } else {
                                    if (rule.failed(body, rule.getValue(), req)) {
                                        rule.addReason(key, body, rule.getValue());
                                        failedRules.push(rule);
                                    }
                                }
                                break;
                            default:
                                if(typeof body === "undefined" || body === null) {
                                    rule.addReason(key, body, rule.getValue());
                                    failedRules.push(rule);
                                } else {
                                    //Its just a normal advanced rule
                                    if (rule.failed(body, rule.getValue())) {
                                        rule.addReason(key, body, rule.getValue());
                                        failedRules.push(rule);
                                    }
                                }

                        }
                    } else {
                        if(typeof body === "undefined" || body === null) {
                            rule.addReason(key, body);
                            failedRules.push(rule);
                        } else {
                            //Basic Rule
                            if (rule.failed(body)) {
                                rule.addReason(key, body);
                                failedRules.push(rule);
                            }
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
