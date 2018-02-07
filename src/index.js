/**
 * Created by christianbartram on 2/6/18.
 */
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./Auth');
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
    name:'required|max:50|alphanumeric',
    birthday: 'max:150|required|date',
    friends: 'array|required|alphanumeric|max:3',
};

app.post('/api/v1/form/submit', auth.validate(opts), (req, res) => {
    res.json({success: true, validRequest: req.valid, why: req.why});
});

app.listen(3000, () => {
    console.log(chalk.blue('Running version 1.0.0'));
    console.log(chalk.blue('---------------------------------'));
    console.log(chalk.blue(`| Server Listening on Port 3000 |`));
    console.log(chalk.blue('---------------------------------'));
});
