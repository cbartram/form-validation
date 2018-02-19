/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
import Parser from './parser/Parser';

export default class Validator {

    /**
     * Parses the validation rules
     * and enforces the rules on the HTTP Request
     * @param data Object
     * @returns {initialize}
     */
    static make(data) {
        return function initialize(req, res, next) {
            //Add 2 variables to the request
            req.valid = false;
            req.why = "";

            let parsedRules = Parser.parse(data);

            //Validate the data
            for(let key in parsedRules) {
                let body = req.body[key]; //HTTP Request Body
                let rules = parsedRules[key]; //Array of Rules to enforce

                rules.forEach((rule, iterator) => {
                    //Check each rule against the value given in the HTTP Request body
                    if(rule.getType() === "ADVANCED") {

                        //Some rules require an HTTP request object to be validated
                        switch(rule.getName()) {
                            case "SAME":
                            case "DIFFERENT":
                                if(rule.failed(body, rule.getValue(), req)) {
                                    rule.addReason(rule.getName(), body, rule.getValue());
                                    req.valid = false;
                                    req.why = rule.reason();
                                    next();
                                }
                                break;
                            default:
                                //Its just a normal advanced rule
                                if (rule.failed(body, rule.getValue())) {
                                    console.log("ADVANCED RULE", rule.getName() + " FAILED FOR " + key);
                                    rule.addReason(rule.getName(), body, rule.getValue());

                                    //todo Bail after the first error
                                    req.valid = false;
                                    req.why = rule.reason();
                                    next();
                                }

                        }
                    } else {
                        //Basic Rule
                        if(rule.failed(body)) {
                            console.log("BASIC RULE", rule.getName() + " FAILED FOR " + key);
                            rule.addReason(rule.getName(), body);
                            req.valid = false;
                            req.why = rule.reason();
                            next();
                        }
                    }
                });
            }

            req.valid = true;
            next();
        };
    }
};
