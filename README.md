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
any HTTP REST client to make post requests to the server. The entrypoint
into the application is found under `/form-validation/src/index.js`

### How to Use

Since this Validator was designed as Express Middleware it sits right between
the request being received by express and when it is processed in the routes callback function
and is extremely easy to implement! Lets take a quick look at an example:

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

- success - Boolean True if the validation was successful false otherwise
- why - String Blank if the validation was successful and an error message for why the validation failed

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
    credit_card: 100990
    exp: 2018-01-01
}
```

```javascript
const Validator = require("form-validation");


var options = {
    name: 'required|alphanumeric'
    surname: 'alphanumeric'
    age: 'required|numeric|between:1,100',
    credit_card: 'required|same:age',
    exp: 'required|date_after:2017-01-01
};

Validator.make(options);

```

The example above illustrates a basic POST Body and its respective validation options
`required` `numeric` and `alphanumeric` are Basic Rules whereas `same`, `between` and `date_after` are all advanced rules.

Hopefully this concept is becoming more clear with the previous example! Check out the Table below for a complete
list of all the validation rules.


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