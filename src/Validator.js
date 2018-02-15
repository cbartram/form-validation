/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
import Parser from './parser/Parser';
import AbstractRule from "./rule/AbstractRule";

export default class Validator {
    static make(data) {
        return function initialize(req, res, next) {
            //Add 2 variables to the request
            req.valid = false;
            req.why = "";

            let parsedRules = Parser.parse(data);

            console.log(parsedRules);

            //Validate the data
            for(let key in parsedRules) {
                let body = req.body[key]; //HTTP Request Body
                let rules = parsedRules[key]; //Array of Rules to enforce

                rules.forEach((rule, iterator) => {
                    //Check each rule against the value given in the HTTP Request body
                    if(rule.getType() === "ADVANCED") {
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
                                if (rule.failed(body, rule.getValue())) {
                                    rule.addReason(rule.getName(), body);

                                    //Bail after the first error
                                    if(rule.bail()) {
                                        req.valid = false;
                                        req.why = rule.reason();
                                        next();
                                    } else {
                                        //Continue until the last validation then bail
                                        if(iterator === rules.length) {
                                            req.valid = false;
                                            req.why = rule.reason();
                                            next();
                                        }
                                    }
                                }

                        }
                    } else {
                        //Basic Rule
                        if(rule.failed(body)) {
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
