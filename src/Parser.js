import Rules from './Rules'

/**
 * Created By Christian Bartram
 * This class parses the rules given as arguments to the parse() method
 * into a readable object
 *
 * @param data rules data coming from the HTTP request
 * @return Object
 */
export default class Parser {

    /**
     * Parses string data for each field into usable javascript object
     * @param data
     * @param body
     * @returns {{}}
     */
    static parse(data) {
        let obj = {};

        for(let key in data) {
            //ex obj[name] = [Arr, to, hold, all, the, rules, objects]
            obj[key] = [];


            //Get rules definitions from rules class
            let rules = Rules.rules();

            if(data.hasOwnProperty(key)) {
                let arr = data[key].split("|");

                arr.forEach(element => {
                    //If the element includes a value instead of a boolean
                    if(element.includes(":")) {

                        //example: element:value -> max:50
                        let value = element.substr(element.indexOf(":") + 1, element.length);
                        element = element.substr(0, element.indexOf(":"));

                        //Parse between, includes, and not_in differently
                        if(element === "between" || element === "includes" || element === "not_in") {
                            let arr = value.split(",");

                             rules[element.toUpperCase()].req = true;
                             rules[element.toUpperCase()].value = arr;
                             rules[element.toUpperCase()].why = "";

                        } else {
                            rules[element.toUpperCase()].req = true;
                            rules[element.toUpperCase()].value = value;
                            rules[element.toUpperCase()].why = "";
                        }

                    } else {
                        rules[element.toUpperCase()].req = true;
                    }
                });
            }

            //For each of the parsed rules
            for(let parsed in rules) {
                if(rules[parsed].req) {
                    //Push the parsed rule onto the objects arr at the key position
                    obj[key].push(rules[parsed])
                }
            }
            //If the rule is required (true) add it to the returned object
            //obj[key] = rules;

        }

        return obj;
    }
};
