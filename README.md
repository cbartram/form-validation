# Form Validator [![Build Status](https://travis-ci.org/cbartram/form-validation.svg?branch=develop)](https://travis-ci.org/cbartram/form-validation) [![codecov](https://codecov.io/gh/cbartram/form-validation/branch/develop/graph/badge.svg)](https://codecov.io/gh/cbartram/form-validation)


Validator is a simple to use NodeJS/Express form validation middleware.
It can be implemented with as little as one line of code and customized to fit any applications needs!

Validator sits between the clients request and when the request gets processed by the route to validate
incoming HTTP POST data.

## Getting Started

To get started using Validator simply install it as a dependency using `npm install --save form-validation`

### Prerequisites

Validator will be provided to your project using a simple import statement

`const Validator = require("node-form-validation/lib/Validator").default`

### Installing

If you would like to install Validator locally and run the project simply
clone the project from [github](https://github.com/cbartram/form-validation)

Install any dependencies locally using `npm i`

Finally start the local server using `npm start`

The server will be available at `http://localhost:3000` and you can use
any HTTP REST client to make post requests to the server. The entry point
into the application is found under `/form-validation/src/index.js`

### Using Form Validation

Since this Validator was designed as Express Middleware it sits right between the route callback function
and is designed to be quickly implemented into your NodeJS Backend!

Lets take a quick look at a basic express example:
```javascript
const Validator = require("node-form-validation/lib/Validator").default;

const options = {
    name: 'required'
}

app.post('/your_form/submit', Validator.make(options), (req, res) => {
    //The req object will now be modified with 2 properties
    //"vailid" and "failed"
    if(!req.valid) {
        res.json(req.failed);
    } else {
        res.json({success: true});
    }
});
```

In the example above we added middleware to the express route using
`Validator.make(options)` where we passed a simple object which identifies
the rules to enforce on each field.

After the validation middleware finishes executing it will add two properties to the Express request object

- **valid** - *Boolean* - True if the validation was successful false otherwise
- **failed** - *Array* - Array of `Error` Objects for each rule that Failed validation

The properties above can be accessed in the route's callback function using `req.valid` and `req.failed`

An error object returned from the `req.failed` attempts to describe which rule
 failed and provide detailed information about the failure. The object will appear as follows:
```javascript
{
  "valid": false,
  "failed": [
    {
      "req": true,
      "name": "MAX", //The rules name
      "why": "Christian Bartram : must not be greater than the specified value: 5",
      "key": [
        "name" //An array of HTTP POST body key's that this rule is being applied against
      ],
      "value": "5" //The value to compare the rule against
    }
  ]
}
```

### Validation Rules

Validation Rules are the core of this library and can help validate almost
any HTTP POST data quickly and easily.

All rules inherit the parent class `AbstractRule` which provides two different (but important)
types of rules.

- `BasicRule` - A basic rule is any rule that can be validated with a boolean expression
i.e Alphanumeric is a basic rule because it does not require more information other than the field value itself to validate
- `AdvancedRule` - An advanced rules requires one or more pieces of additional data to validate the rule. i.e.
Max is an advanced rule because it requires not only knowing to validate a value as being less than a maximum value but ALSO what that maximum value is.

You can quickly combine combinations of Basic and Advanced rules to validate form data.
Combinations can be chained together using the pipe `|` and values for Advanced Rules are set using `:`

Lets take a look at an example to help clarify these concepts!
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
const Validator = require("node-form-validation/lib/Validator").default;

var options = {
    name: 'required|alphanumeric' //Notice how we chain rules together with '|'
    surname: 'alphanumeric'
    age: 'required|numeric|between:1,100', //We can set the values for between using ':' and ','
    credit_card: 'required|credit_card|same:age',
    exp: 'required|date_after:2017-01-01'
};

//Add this as middleware to your route!
Validator.make(options);

```

The example above illustrates a basic POST Body and its respective validation options.
Notice how in the name field `required` is chained together with `alphanumeric` to enforce both rules upon the field.
Advanced rules (such as `between` in this case) use the `:` symbol to identify which values should be used as input into their activation function.
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

## Custom Rules <span class="label label-warning">BETA</span>

If none of the above rules suit your use case we still have an option for you! Custom rules allow you to
define and implement the logic behind your own rules however, there are a couple requirements to do this.

- You must have support for ES6 Class syntax in your Node/Express Server
- Thats it!

What we will be doing is extending a custom rule template which gives your rule the ability to integrate
with the existing form-validation middleware. Lets get started!

We are going to be building a rule that validates a single timezone. The first thing we need to do is create
out class template!
```javascript
import CustomRule from 'node-form-validation/lib/rule/CustomRule';

export default class Timezone extends CustomRule {
    constructor(name, activationFunction, errorMessage, value) {
            super(name, activationFunction, errorMessage, value = null); //This value is parsed from your input
            this.name = name;
            this.errorMessage = errorMessage;
            this.activationFunction = activationFunction;
            this.value = value;
    }

    //The following methods are used by the internal validator

    getName() {
       return this.name
    }

    getValue() {
        return this.value;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    //Return the rule type (either BASIC or ADVANCED)
    getType() {
        return "ADVANCED"
    }
}
```
This class initializes some values and provides accessor methods so that
the fields can be easily retrieved!

Next we will instantiate our custom rule and pass it off to the validator

```javascript
const Validator = require("node-form-validation/lib/Validator").default;
const Timezone = require("./Timezone");


//Add our rule!
Validator.addCustomRule(new Timezone("timezone", (field, value) => {
    //Here we define our Activation Function
    //Field is our form's key -> date and value is its value -> America/New_York
    //(this function determines if the form input is valid or not)

    return value === "America/New_York";

}, " is not a valid timezone!"))

const options = {
    name: 'required',
    date: 'date_after:2017-01-01|timezone:America/New_York' //Notice the timezone here!
}

app.post('/your_form/submit', Validator.make(options), (req, res) => {
    res.json({success: req.failed});
});
```

That's it! It might feel like a lot of code to add your own rule but its actually clean
and repeatable. Hopefully you will find you dont need to add additional rules but on the off chance
that you do this is how its done!

## Under The Hood

All rules go through a single validation process before they are deemed valid or invalid.
each rule is parsed using the `|` and `:` symbols so that rules can be identified as either
`AdvancedRules` or `BasicRules`.

```javascript
//input
let opts = {
    name:"max:50",
    friends: "required"
};

//Output after parsing
{ name:
   [ AdvancedRule {
       name: 'MAX',
       why: null,
       activationFunction: [Function],
       req: true,
       value: '50',
       key: ['name'] } ]
  friends:
    [ BasicRule {
        name: "REQUIRED",
        why: null,
        activationFunction: [Function],
        req: true,
        key: ['friends']
      } ]
}
```
Each rule includes a property called `activationFunction` which is a unique function which accepts valid input
and rejects invalid input.

## Running the tests

Unit tests are located in the `test` directory and are all maintained in a single javascript file. All unit
tests are Compatible with [Mocha](http://mochajs.org) and [Chai](http://chaijs.org) and
can be run with the command quickly with the command `npm test`

## Deployment

Deploy this software to NPM using a pull request **after** forking and cloning
the project. If the pull request is accepted it will be deployed to NPM on the next update!

## Built With

* [NodeJS](http://www.nodejs.org) - Server Side Javascript
* [Express](https://express.com) - HTTP Framework
* [Javascript](https://mozilla.com) - Language Used
* [NPM](http://npm.org) - Dependency Management
* [Git](http://git.com) - Version Control
* [Mocha](http://mochajs.com) - Testing Framework
* [Chai](http://chaijs.com) - Assertion Library

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/cbartram/form-validation/tags).

## Authors

* **Christian Bartram** - *Lead Developer* - [cbartram](https://github.com/cbartram)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Erika Pickard - for listening to me and helping me ;)
* [Laravel](http://laravel.com) - for inspiring an effective way to validate forms