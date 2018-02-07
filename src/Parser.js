const chalk = require("chalk");
const Rules = require("./Rules");

/**
 * Created By Christian Bartram
 * This class parses the rules given as arguments to the parse() method
 * into a readable object
 *
 * @param data rules data coming from the HTTP request
 * @return Object
 */
module.exports = {
    parse(data) {
        let obj = {};

        console.log(data);

        for(let key in data) {
            //Use a new rules object for each key
            let rules = Rules.rules();
            let arr  = data[key].split("|");

            arr.forEach(element => {
               //If the element includes a value instead of a boolean
               if(element.includes(":")) {
                    //example: element:value -> max:50
                    let value = element.substr(element.indexOf(":") + 1, element.length);
                    element = element.substr(0, element.indexOf(":"));

                    rules[element.toUpperCase()].req = true;
                    rules[element.toUpperCase()].value = value;

               } else {
                   rules[element.toUpperCase()] = true;
               }
            });

            obj[key] = rules;
        }

        return obj;
    }
};
