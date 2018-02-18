# Validator

Validator is a simple to use NodeJS/Express form validation middleware.
It can be implemented with as little as one line of code and customized to fit any applications needs!

Validator sits between the clients request and when the request gets processed by the route to validate
incoming HTTP POST data.

## Getting Started

To get started using Validator simply install it as a dependency using `npm install --save form-validation`

### Prerequisites

Validator will be provided to your project using a simple import statement

`const Validator = require("form-validation")` or if you are using ES6
`import Validator from "form-validation"`

### Installing

If you would like to install Validator locally and run the project simply
clone the project from [github](https://github.com/cbartram/form-validation)

Install any dependencies locally using `npm i`

Finally start the local server using `npm start`

The server will be available at `http://localhost:3000` and you can use
any HTTP REST client to make post requests to the server. The entry point
into the application is found under `/form-validation/src/index.js`

### Using Form Validation

Since this Validator was designed as Express Middleware it sits right between
the request being received by express and when the request is processed in the routes callback function.
It is extremely easy to implement form validation for your NodeJS Backend!

Lets take a quick look at a basic express example:
```javascript
const Validator = require("form-validation");

const options = {
    name: 'required'
}

app.post('/your_form/submit', Validator.make(options), (req, res) => {
    //The req object will now be modified with 2 properties
    //"success" and "why"
    if(!req.success) {
        res.send(req.why);
    }
});
```

In the example above we added middleware to the express route using
`Validator.make(options)` where we passed a simple object which identifies
the rules to enforce on each field.

After the validation middleware finishes executing it will add two properties to the Express request object

- **success** - Boolean True if the validation was successful false otherwise
- **why** - Array Blank String if the validation was successful and an error message for why the validation failed

The properties above can be accessed in the route's callback function using `req.success` and `req.why`

### Validation Rules

Validation Rules are the core of this framework and can help validate almost
any HTTP POST data quickly and easily.

All rules inherit the parent class `AbstractRule` which provides two different (but important)
types of rules.

- `BasicRule` - A basic rule is any rule that can be validated with a boolean expression
i.e Alphanumeric is a basic rule because it does not require more information other than the field value itself to validate
- `AdvancedRule` - An advanced rules requires one or more pieces of additional data to validate the rule. i.e.
Max is an advanced rule because it requires not only knowing to validate a value as being less than a maximum value but ALSO what that maximum value is.

You can quickly combine combinations of Basic and Advanced rules to validate form data.
Combinations can be chained together using the pipe `|` and properties for Advanced Rules are set using `:`

Lets take a look at an example!
```javascript
//POST Body
{
    name: "Joe",
    surname: "McGoo",
    age: 23,
    credit_card: 10099088976
    exp: 2018-01-01
}
```

```javascript
const Validator = require("form-validation");


var options = {
    name: 'required|alphanumeric'
    surname: 'alphanumeric'
    age: 'required|numeric|between:1,100',
    credit_card: 'required|credit_card|same:age',
    exp: 'required|date_after:2017-01-01'
};

Validator.make(options);

```

The example above illustrates a basic POST Body and its respective validation options.
Notice how in the name field `required` is chained together with `alphanumeric` to enforce both rules upon the field.
Advanced rule such as between use the `:` symbol to identify which values should be used as input into their activation function.
For more information about how the rules are validated and processed see the **Under the Hood** section below!

It is important to note that not all rules can be chained together for instance, `before` and `credit_card` cannot be chained
together because there is no way the rule would ever be valid. A credit card number can never be a valid date. Use rule combinations at
your discretion.

For reference reasons: `required` `numeric` and `alphanumeric` are Basic Rules whereas `same`, `between` and `date_after` are all advanced rules.

Hopefully this concept is becoming more clear with the previous example! Check out the Table below for a complete
list of all the validation rules.

| **Rule Name**   | **Rule Type** | **Rule Description**                                                                                                                                          | **Example**                                                                                               |
|-----------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Alphanumeric    | Basic Rule    | Requires that the value be alphanumeric (./+-_()&*^%$#@!)                                                                                                     | `{"name": "alphanumeric"}`                                                                                |
| After           | Advanced Rule | Requires that the date comes chronologically after the value                                                                                                  | `{"birthday": "after:2017-01-01"}`                                                                        |
| After or Equal  | Advanced Rule | Requires that the data comes chronologically after or equal to the value                                                                                      | `{"birthday": "after_or_equal:2017-01-01"}`                                                               |
| Array           | Basic Rule    | Requires that the field being validated is of type Array                                                                                                      | `{"friends": "array"}`                                                                                    |
| Alpha           | Basic Rule    | Requires that the field being validated is alpha characters only (a-z, A-Z)                                                                                   | `{"birthday": "alpha"}`                                                                                   |
| Boolean         | Basic Rule    | Requires the field to be of type boolean                                                                                                                      | `{"birthday": "boolean"}`                                                                                 |
| Before          | Advanced Rule | Requires the date to come chronologically before the value                                                                                                    | `{"birthday": "before:2017-01-01"}`                                                                       |
| Before or Equal | Advanced Rule | Requires the date to come chronologically before or equal to the value                                                                                        | `{"birthday": "before_or_equal:2017-01-01"}`                                                              |
| Between         | Advanced Rule | Requires that the field under validation is within or equal to the set                                                                                        | `{"foo":"between:0,10"}`                                                                                  |
| Credit Card     | Basic Rule    | The field under validation must be a valid US credit card number                                                                                              | `{"credit":"credit_card"}`                                                                                |
| Date            | Basic Rule    | The field must be a valid ISO date ex 2017-01-05                                                                                                              | `{"date_joined": "date"}`                                                                                 |
| Date_Equals     | Advanced Rule | The field under validation must be equal to the given value                                                                                                   | `{"date_joined": "date_equals:2017-01-01"}`                                                               |
| Date_Format     | Advanced Rule | The field under validation must adhere to the specified date format                                                                                           | `{"date_joined": "date_format:YYYY-MM-DD"}`                                                               |
| Different       | Advanced Rule | The field under validation must be different from the value of the field name specified for the value of this rule. Confused yet?! Take a look at the example | `{ name: "required",   surname: "different:name" } //Surname's value must be different from name's value` |
| Digits          | Basic Rule    | The field under validation must consist of digits [0-9]                                                                                                       | `{ age: "digits"}`                                                                                        |
| Distinct        | Basic Rule    | The array must consist of distinct values (no duplicates)                                                                                                     | `{friends: "distinct"}`                                                                                   |
| Email           | Basic Rule    | The field must be a valid email address                                                                                                                       | `{email: "email"}`                                                                                        |
| Filled          | Basic Rule    | The field must not be null or undefined i.e. it has a valid value                                                                                             | `{name: "filled"}`                                                                                        |
| Includes        | Advanced Rule | The field must be includes in the set specified by this Rules value. See the example for further explanation                                                  | `{friends: "includes:Joe, Sam, John"} //The field friends must be either Joe, Sam, or John`               |
| Integer         | Basic Rule    | The field under validation must be an Integer                                                                                                                 | `{age: "integer"}`                                                                                        |
| IP              | Basic Rule    | The field must be an IPV4 or IPV6 Address                                                                                                                     | `{computer: "ip"}`                                                                                        |
| IPV4            | Basic Rule    | The field must be a valid IPV4 Address                                                                                                                        | `{computer_v4: "ipv4"}`                                                                                   |
| IPV6            | Basic Rule    | The field under validation must be a valid IPV6 Address                                                                                                       | `{computer_v6: "ipv6"}`                                                                                   |
| JSON            | Basic Rule    | The field under validation must be valid JSON                                                                                                                 | `{response: "json"}`                                                                                      |
| Max             | Advanced Rule | The field under validation must not exceed the maximum value specified                                                                                        | `{age: "max:7"}`                                                                                          |
| Min             | Advanced Rule | The field under validation must not fall below the minimum value specified                                                                                    | `{age: "min:7"}`                                                                                          |
| Nullable        | Basic Rule    | The field can be null or undefined but does not have to be.                                                                                                   | `{optional_field: "nullable"}`                                                                            |
| Numeric         | Basic Rule    | The field must be numeric in nature.                                                                                                                          | `{age: "numeric"}`                                                                                        |
| Not_in          | Advanced Rule | The field under validation must not be in the given set for the value of this rule                                                                            | `{enemies: "not_in:Jason, Paul,Linda"} // The value of enemies must not be Jason or paul or Linda`        |
| Required        | Basic Rule    | The field under validation must be present in the HTTP Post body                                                                                              | `{name: "required"}`                                                                                      |
| Regex           | Advanced Rule | The field under validation must match the given regular expression                                                                                            | `{name: "regex:([A-Z][0-9])/g"}`                                                                          |
| Size            | Advanced Rule | The field under validation must match the given size.                                                                                                         | `{name: "size:20"}`                                                                                       |
| Same            | Advanced Rule | The field under validation's value must match the value of the fields name given as an argument to this rule. See the example for more information            | `{ name: "required", surname: "same:name"} //The surname must be the same as name in the Request`         |
| String          | Basic Rule    | The field under validation must be of type String                                                                                                             | `{name: "string"}`                                                                                        |

## Under The Hood

All rules go through a single validation process before they are deemed valid or invalid.
each rule is parsed using the `|` and `:` symbols so that rules can be broken down into either
`AdvancedRules` or `BasicRules`. An advanced rule contains a value property while a basic rule does not.
The `required` rules is advanced because it does not require a value while the `max` rule is advanced because it requires a value
i.e. `max:5`.

Once the parsing process is complete the Rules are transformed into an array containing each `AbstractRule` object
which can each be easily validated.

## Running the tests

Unit tests can be run with the command `npm run test`


## Deployment

Deploy this software to NPM using `npm publish`

## Built With

* [NodeJS](http://www.nodejs.org) - Server Side Javascript
* [Express](https://express.com) - HTTP Framework
* [Javascript](https://mozilla.com) - Language Used
* [NPM](http://npm.org) - Dependency Management
* [Git](http://git.com) - Version Control

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Christian Bartram** - *Initial Work* - [cbartram](https://github.com/cbartram)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Erika Pickard - for listening to me and helping me ;)
* Laravel - for inspiring an effective way to validate forms