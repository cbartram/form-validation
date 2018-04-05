import Rules from '../rule/RuleFactory'

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
     * @param data Request body as JSON
     * @returns {Object}
     */
     parse(data) {
        //Get rules definitions from rules class
        let rules = Rules.rules();
        let shouldBail = false;
        let obj = {};

        for(let key in data) {
            //ex obj[MAX] = [AdvancedRule(), BasicRule(), BasicRule(), AdvancedRule()]
            if(data.hasOwnProperty(key)) {
                obj[key] = [];
            }

            if(data.hasOwnProperty(key)) {
                let arr = data[key].split("|");

                //arr => ['max:50', 'after:1994-01-01', 'required']
                arr.forEach(element => {

                    element.toUpperCase() === "BAIL" ? shouldBail = true : null;

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
                                 rules[element.toUpperCase()].key.push(key);

                        } else {
                                rules[element.toUpperCase()].req = true;
                                rules[element.toUpperCase()].value = value;
                                rules[element.toUpperCase()].key.push(key);
                        }
                    } else {
                            rules[element.toUpperCase()].req = true;
                            rules[element.toUpperCase()].key.push(key);
                    }
                });
            }
        }

        //For each of the parsed rules
        for(let parsed in rules) {
            if(rules[parsed].req) {

                //Find out which key in obj this rule applies to
                rules[parsed].getKey().forEach(key => {
                    obj[key] = [];
                    //Push the parsed rule onto the objects arr at the key position
                    obj[key].push(rules[parsed]);
                });
            }
        }
        return obj;
    }
};
