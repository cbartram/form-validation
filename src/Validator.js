/**
 * Created by christian bartram on 2/6/18.
 */
const parser = require('./Parser');
const validator = require('validator');
const chalk = require('chalk');

//Why the request was invalid
let why = "";

module.exports = {
    validate(data) {
        console.log("Parsed Arguments:", data);

        return function initialize(req, res, next) {
            //Add 2 variables to the request
            req.valid = false;
            req.why = why;


            let rules = parser.parse(data);
            const body = req.body;

            console.log(req.body.birthday);

            //Validate the data
            for(let key in rules) {

                //Key is Required but is also missing in the body of the request
                if(rules[key].REQUIRED && typeof body[key] === "undefined") {
                    req.valid = false;
                    req.why = `One of the Required Keys is missing in the request body -> ${key}`;
                    next();
                }
            }

            req.valid = true;
            next();
        };
    }
};