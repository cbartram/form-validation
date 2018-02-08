/**
 * Created by christian bartram on 2/6/18.
 *
 * todo Short circuit validation option, multiple nested layers for json
 */
const parser = require('./Parser');
let validator = require('validator');
const chalk = require('chalk');
const moment = require('moment');

//Why the request was invalid
let why = "";

module.exports = {
    make(data) {
        return function initialize(req, res, next) {
            //Add 2 variables to the request
            req.valid = false;
            req.why = why;


            let rules = parser.parse(data);

            console.log("Body -> ", req.body);
            console.log("Rules -> ", rules);


            //Validate the data
            for(let key in rules) {
                let body = req.body[key];
                let rule = rules[key];

                //Key is Required but is also missing in the body of the request
                if(rule.REQUIRED && typeof body === "undefined") {
                    req.valid = false;
                    req.why = `One of the Required Keys is missing in the request body -> ${key}`;
                    next();
                }

                //The item must be an array
                if(rule.ARRAY && !Array.isArray(body)) {
                    req.valid = false;
                    req.why = `The key -> ${key} must be of type Array`;
                    next();
                }

                //Ensure the data does not exceed a max length
                if(rule.MAX.req && body.length > rule.MAX.value) {
                    req.valid = false;
                    req.why =  `The key exceeds the max length. Key length: ${body.length}  Max length: ${rule.MAX.value}`;
                    next();
                }

                if(rule.NUMERIC && !validator.isNumeric(body)) {
                    req.valid = false;
                    req.why =  `The key -> ${key} must be a numeric type [0-9]`;
                    next();
                }

                //The key is not a date
                if(rule.DATE && validator.toDate(body) === null) {
                    req.valid = false;
                    req.why = `The key -> ${key} must be in a valid Javascript date format`;
                    next();
                }

                //Is a boolean?
                if(rule.BOOLEAN && !validator.isBoolean(body + "")) {
                    req.valid = false;
                    req.why = `The key -> ${key} was expected to be of type boolean but got ${typeof body}`;
                    next();
                }

                if(rule.ALPHANUMERIC && !validator.isAlphanumeric(body + "", 'en-US')) {
                    req.valid = false;
                    req.why =  `The key -> ${key} must be an alphanumeric value`;
                    next();
                }

                //todo could be different for arrays vs multipart form data
                if(rule.SIZE.req && parseInt(rule.SIZE.value) !== body.length) {
                    req.valid = false;
                    req.why = `They key -> ${key} was expected to be of size: ${rule.SIZE.value} but got ${body.length}`;
                    next();
                }

                //Must be ISO example: 2013-05-05 todo perhaps add more flexibility here e.g. after:tomorrow
                if(rule.AFTER.req && !moment(body).isAfter(rule.AFTER.value)) {
                    req.valid = false;
                    req.why = `They key -> ${key} with value ${body} was expected to be chronologically after ${rule.AFTER.value}`;
                    next();
                }

                //After or Equal Date
                if(rule.AFTER_OR_EQUAL.req && !moment(body).isSameOrAfter(rule.AFTER.value)) {
                    req.valid = false;
                    req.why = `They key -> ${key} with value ${body} was expected to be chronologically identical or chronologically after ${rule.AFTER.value}`;
                    next();
                }

                if(rule.ALPHA && !validator.isAlpha(body + "", 'en-US')) {
                    req.valid = false;
                    req.why =  `The key -> ${key} must be an alpha value [A-Z][a-z]`;
                    next();
                }

                if(rule.BEFORE.req && !moment(body).isBefore(rule.BEFORE.value)) {
                    req.valid = false;
                    req.why = `The key -> ${key} with value ${body} was expected to be chronologically before ${rule.BEFORE.value}`;
                    next();
                }

                if(rule.BEFORE_OR_EQUAL.req && !moment(body).isSameOrBefore(rule.BEFORE_OR_EQUAL.value)) {
                    req.valid = false;
                    req.why = `The key -> ${key} with value ${body} was expected to be chronologically identical or chronologically before ${rule.BEFORE_OR_EQUAL.value}`;
                    next();
                }

                //Ensure value is between min/max
                if(rule.BETWEEN.req && !isBetween(body, rule.BETWEEN.value[0], rule.BETWEEN.value[1])) {
                    req.valid = false;
                    req.why =  `The key -> ${key} must be contained in the set [${rule.BETWEEN.value[0]}, ${rule.BETWEEN.value[1]}]`;
                    next();
                }

                if(rule.CONFIRMED && !Object.keys(req.body).includes(`${key}_confirmation`)) {
                    console.log(Object.keys(req.body));
                    req.valid = false;
                    req.why =  `The key -> ${key} must contain its respective confirmation field i.e. ${key}_confirmation `;
                    next();
                }

                if(rule.DATE_EQUALS.req && !moment(body).isSame(rule.DATE_EQUALS.value)) {
                    req.valid = false;
                    req.why = `The key -> ${key} with value ${body} was expected to be chronologically equal to ${rule.DATE_EQUALS.value}`;
                    next();
                }

                //Formats a specific date todo doesnt work quite yet
                if(rule.DATE_FORMAT.req && moment(body, rule.DATE_FORMAT.value).isValid()) {
                    req.valid = false;
                    req.why = `The key -> ${key} with value ${body} was expected to be a moment compatible date formatted -> ${rule.DATE_FORMAT.value}`;
                    next();
                }

                //If this currently observed fields value (body) is different from a different field in the request
                if(rule.DIFFERENT.req && body === req.body[rule.DIFFERENT.value]) {
                    req.valid = false;
                    req.why = `The key -> ${key} with value ${body} was expected to be a different value from  -> ${req.body[rule.DIFFERENT.value]}`;
                    next();
                }

                if(rule.DIGITS.req && (!validator.isNumeric(body) || body.length !== parseInt(rule.DIGITS.value))) {
                    req.valid = false;
                    req.why = `The key -> ${key} with value ${body} was expected to be numeric and of the length -> ${rule.DIGITS.value}`;
                    next();
                }

                if(rule.DISTINCT && (hasDuplicates(body) || !Array.isArray(body))) {
                    req.valid = false;
                    req.why = `The key -> ${key} must not contain any duplicates and must also be of type Array`;
                    next();
                }

                if(rule.EMAIL && !validator.isEmail(body)) {
                    req.valid = false;
                    req.why = `The key -> ${key} must be a valid email address`;
                    next();
                }

                if(rule.FILLED && isNullOrUndefined(body)) {
                    req.valid = false;
                    req.why = `The key -> ${key} must not be null, undefined, or blank`;
                    next();
                }

                if(rule.INCLUDES.req && !body.some(r => rule.INCLUDES.value.includes(r))) {
                    console.log(body);
                    console.log(rule.INCLUDES.value);
                    req.valid = false;
                    req.why = `The key -> ${key} is missing one or more of the following value(s): ${rule.INCLUDES.value}`;
                    next();
                }

            }

            req.valid = true;
            next();
        };
    }
};

/**
 * Utility function to determine if a value is between two other values
 * @param value
 * @param min
 * @param max
 * @returns {boolean}
 */
const isBetween = (value, min, max) => {
    if(value > max) {
        return false
    }

    if( value < min) {
        return false
    }

    return !(value === max || value === min);

};

const isNullOrUndefined = (value) => {
    return typeof value === 'undefined' || value === null || value.length === 0
};

/**
 * Checks for duplicates in an Array
 * @param array
 * @returns {boolean}
 */
const hasDuplicates = (array) => {
    return (new Set(array)).size !== array.length;
};