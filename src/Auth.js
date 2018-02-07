/**
 * Created by christian bartram on 2/6/18.
 */
const parser = require('./Parser');
let validator = require('validator');
const chalk = require('chalk');

//Why the request was invalid
let why = "";

module.exports = {
    validate(data) {
        return function initialize(req, res, next) {
            //Add 2 variables to the request
            req.valid = false;
            req.why = why;


            let rules = parser.parse(data);
            const body = req.body;

            console.log("Body -> ", req.body);
            console.log("Rules -> ", rules);


            //Validate the data
            for(let key in rules) {

                //Key is Required but is also missing in the body of the request
                if(rules[key].REQUIRED && typeof body[key] === "undefined") {
                    req.valid = false;
                    req.why = `One of the Required Keys is missing in the request body -> ${key}`;
                    next();
                }

                //The item must be an array
                if(rules[key].ARRAY && !Array.isArray(body[key])) {
                    req.valid = false;
                    req.why = `The key -> ${key} must be of type Array`;
                    next();
                }

                //Ensure the data does not exceed a max length
                if(rules[key].MAX.req && body[key].length > rules[key].MAX.value) {
                    req.valid = false;
                    req.why =  `The key exceeds the max length. Key length: ${body[key].length}  Max length: ${rules[key].MAX.value}`;
                    next();
                }

                if(rules[key].NUMERIC && !validator.isNumeric(body[key])) {
                    req.valid = false;
                    req.why =  `The key -> ${key} must be a numeric type [0-9]`;
                    next();
                }

                //The key is not a date
                if(rules[key].DATE && validator.toDate(body[key]) === null) {
                    req.valid = false;
                    req.why = `The key -> ${key} must be in a valid Javascript Date format`;
                    next();
                }


            }

            req.valid = true;
            next();
        };
    }
};