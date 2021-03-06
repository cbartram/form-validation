'use strict';

/**
 * Created by christianbartram on 2/6/18.
 */
var express = require('express');
var bodyParser = require('body-parser');
var Validator = require('./Validator').default;
var chalk = require('chalk');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Serve HTML file
app.get('/', function (req, res) {
    return res.sendFile("/public/index.html", { root: __dirname });
});

var opts = {
    name: "max:1",
    address: "required|between:1,10",
    birthday: "required|after:1994-01-01",
    friends: "between:1,10"
};

app.post('/api/v1/form/submit', Validator.make(opts), function (req, res) {
    res.json({ valid: req.valid, failed: req.failed });
});

app.listen(3000, function () {
    console.log(chalk.blue('Running version 1.0.0'));
    console.log(chalk.blue('---------------------------------'));
    console.log(chalk.blue('| Server Listening on Port 3000 |'));
    console.log(chalk.blue('---------------------------------'));
});

module.exports = app;