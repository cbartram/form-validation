/**
 * Created by christianbartram on 2/18/18.
 */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const Validator = require("../lib/Validator").default;
const app = require('../lib/index');


describe('Rules', () => {
    it('Validates Alphanumeric Rule', (done) => {
       const opts = {
            name: "alphanumeric"
        };


        app.post('/alphanumeric', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/alphanumeric')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: "Christian"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates After Rule', (done) => {
        const opts = {
            birthday: "after:2017-01-01"
        };


        app.post('/after', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/after')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({birthday: "2018-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates After_or_equal Rule', (done) => {
        const opts = {
            birthday: "after_or_equal:2017-01-01"
        };


        app.post('/afterequal', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/afterequal')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({birthday: "2017-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Array Rule', (done) => {
        const opts = {
           friends: "array"
        };


        app.post('/array', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/array')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({friends: []})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Alpha Rule', (done) => {
        const opts = {
            name: "alpha"
        };


        app.post('/alpha', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/alpha')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: "foo"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Boolean Rule', (done) => {
        const opts = {
            hungry: "boolean"
        };


        app.post('/boolean', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/boolean')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({hungry: true})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Before Rule', (done) => {
        const opts = {
            birthday: "before:2017-01-01"
        };


        app.post('/before', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/before')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({birthday: "1994-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    it('Validates Boolean_or_equal Rule', (done) => {
        const opts = {
            hungry: "before_or_equal:2017-01-01"
        };


        app.post('/beforeequal', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/beforeequal')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({hungry: "2017-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates between Rule', (done) => {
        const opts = {
            hungry: "between:0,5"
        };


        app.post('/between', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/between')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({hungry: 4})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Credit_card Rule', (done) => {
        const opts = {
            credit_card: "credit_card"
        };


        app.post('/creditcard', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/creditcard')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({credit_card: "4111 1111 1111 1111"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    it('Validates Date Rule', (done) => {
        const opts = {
            today: "date"
        };


        app.post('/date', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/date')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({today: "2017-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });



    it('Validates Date_equals Rule', (done) => {
        const opts = {
            today: "date_equals:2017-01-01"
        };


        app.post('/dateequals', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/dateequals')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({today: "2017-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Date_format Rule', (done) => {
        const opts = {
           today: "date_format:YYYY-MM-DD"
        };


        app.post('/dateformat', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/dateformat')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({today: "2017-01-01"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    //Todo validate different arrays
    it('Validates Different Rule', (done) => {
        const opts = {
            best_friend:'required',
            friends: "different:best_friend"
        };


        app.post('/different', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/different')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({friends: "Jason Smith", best_friend:"Jason"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    //Todo Digits rule does not correctly validate integers only strings representing integers
    it('Validates Digits Rule', (done) => {
        const opts = {
            credit_card: "digits:3"
        };


        app.post('/digits', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/digits')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({credit_card: "122"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Distinct Rule', (done) => {
        const opts = {
            friends: "distinct"
        };


        app.post('/distinct', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/distinct')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({friends: ["Jason", "Tommy", "Fred", "George"]})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Email Rule', (done) => {
        const opts = {
            email: "email"
        };


        app.post('/email', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/email')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({email: "foo86@gmail.com"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Filled Rule', (done) => {
        const opts = {
            filled: "filled"
        };


        app.post('/filled', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/filled')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({filled: true})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    //todo Must be used in conjunction with the Array Rule server crashes if the rule is not an array
    it('Validates Includes Rule', (done) => {
        const opts = {
            friends: "includes:fred,george,jason,tommy"
        };


        app.post('/includes', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/includes')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({friends: ["foo", "fred"]})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    it('Validates Integer Rule', (done) => {
        const opts = {
            phone: "integer"
        };


        app.post('/integer', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/integer')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({phone: 100})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates IP Rule', (done) => {
        const opts = {
            ip: "ip"
        };


        app.post('/ip', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/ip')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({ip: "192.168.1.1"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    it('Validates IPV4 Rule', (done) => {
        const opts = {
            ip: "ipv4"
        };


        app.post('/ipv4', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/ipv4')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({ip: "192.168.1.1"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates IPV6 Rule', (done) => {
        const opts = {
            ip: "ipv6"
        };


        app.post('/ipv6', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/ipv6')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({ip: "FE80:CD00:0000:0CDE:1257:0000:211E:729C"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    it('Validates JSON Rule', (done) => {
        const opts = {
            name: "json"
        };


        app.post('/json', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/json')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: '{"yes": 1}'})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Max Rule', (done) => {
        const opts = {
            name: "max:10"
        };


        app.post('/max', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/max')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: "Jones_b"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Min Rule', (done) => {
        const opts = {
            name: "min:5"
        };


        app.post('/min', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/min')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: "woooo"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Nullable Rule', (done) => {
        const opts = {
            name: "nullable"
        };


        app.post('/nullable', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/nullable')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: null})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Numeric Rule', (done) => {
        const opts = {
            age: "numeric"
        };


        app.post('/numeric', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/numeric')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({age: 5})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

});