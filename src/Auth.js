/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
import Parser from './Parser';
let validator = require('validator');
const chalk = require('chalk');
const moment = require('moment');
const Type = require('./Type');

//Why the request was invalid
let why = "";

export default class Auth {
    static make(data) {
        return function initialize(req, res, next) {
            //Add 2 variables to the request
            req.valid = false;
            req.why = why;

            let parsedRules = Parser.parse(data);

            console.log(parsedRules);

            //Validate the data
            for(let key in parsedRules) {
                let body = req.body[key]; //HTTP Request Body
                let rules = parsedRules[key]; //Array of Rules to enforce

                rules.forEach(rule => {
                    //Check each rule against the value given in the HTTP Request body
                    if(rule.getType() === "ADVANCED") {
                        //Different case for SAME & DIFFERENT Rules
                        if(rule.getName() === "SAME" || rule.getName() === "DIFFERENT") {
                            if(rule.failed(body, rule.getValue(), req)) {
                                console.log("RULE " + rule.getName() + " failed!");
                                req.valid = false;
                                req.why = rule.reason(body, rule.getValue());
                            }
                        } else {
                            if (rule.failed(body, rule.getValue())) {
                                console.log("RULE " + rule.getName() + " failed!");
                                req.valid = false;
                                req.why = rule.reason(body, rule.getValue());
                            }
                        }
                    } else {
                        //Basic Rule
                        if(rule.failed(body)) {
                            console.log("BASIC RULE " + rule.getName() + " failed!");
                            req.valid = false;
                            req.why = rule.reason(key);
                        }
                    }
                });

                // //In docs note that the rule must be without / because it is created from the RegExp Constructor
                // if(rule.REGEX.req && !new RegExp(rule.REGEX.value).test(body)) {
                //     req.valid = false;
                //     req.why =  `The key ${key} with value: ${body} does not match the given regular expression.`;
                //     next();
                // }



            }

            req.valid = true;
            next();
        };
    }
};
