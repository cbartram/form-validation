/**
 * Created by christianbartram on 2/6/18.
 */
const express = require('express');
const bodyParser = require('body-parser');
const Validator = require('./Validator').default;
const chalk = require('chalk');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Serve HTML file
app.get('/', (req, res) => res.sendFile("/public/index.html", {root: __dirname}));

let opts = {
    name:"max:1",
    address: "required|between:1,10",
    birthday:"required|after:1994-01-01",
    friends: "between:1,10",
};

app.post('/api/v1/form/submit', Validator.make(opts), (req, res) => {
    res.json({valid: req.valid, failed: req.failed});
});

app.listen(3000, () => {
    console.log(chalk.blue('Running version 1.0.0'));
    console.log(chalk.blue('---------------------------------'));
    console.log(chalk.blue(`| Server Listening on Port 3000 |`));
    console.log(chalk.blue('---------------------------------'));
});


module.exports  = app;