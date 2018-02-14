/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
import Parser from './parser/Parser';

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

                rules.forEach(rule => {
                    //Check each rule against the value given in the HTTP Request body
                    if(rule.getType() === "ADVANCED") {
                        switch(rule.getName()) {
                            case "SAME":
                            case "DIFFERENT":
                                if(rule.failed(body, rule.getValue(), req)) {
                                    req.valid = false;
                                    req.why = rule.reason(body, rule.getValue());
                                    next();
                                }
                                break;
                            default:
                                if (rule.failed(body, rule.getValue())) {
                                    req.valid = false;
                                    req.why = rule.reason(body, rule.getValue());
                                    next();
                                }

                        }
                    } else {
                        //Basic Rule
                        if(rule.failed(body)) {
                            req.valid = false;
                            req.why = rule.reason(key);
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
