/**
 * Created by christianbartram on 2/6/18.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const myLogger = (req, res, next) => {
    console.log('LOGGED');
    next()
};

const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next()
};

app.use(requestTime);
app.use(myLogger);

//Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Serve HTML file
app.get('/', (req, res) => res.sendFile("/public/index.html", {root: __dirname}));


app.get('/api/v1/form/submit', (req, res) => {
    res.json({success: true});
});

app.listen(3000, () => {
    console.log(chalk.blue('Running version 1.0.0'));
    console.log(chalk.blue('----------------------------------'));
    console.log(chalk.blue(`|  Server Listening on Port 3000 |`));
    console.log(chalk.blue('----------------------------------'));
});
