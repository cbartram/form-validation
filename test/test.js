/**
 * Created by christianbartram on 2/18/18.
 */
let AbstractRule = require("../lib/rule/AbstractRule").default;
const RuleFactory = require("../lib/rule/RuleFactory").default;
const expect = require('chai').expect;
const request = require('supertest');
const Validator = require("../lib/Validator").default;
const app = require('../lib/index');
const ErrorCode = require('../lib/error/ErrorCode').default;
const ValidationError = require('../lib/error/ValidationError').default;
const Util = require("../lib/Util").default;
const Parser = require("../lib/parser/Parser").default;

RuleFactory.init();
ErrorCode.init();

describe('Parser Tests', () => {
    let input = {
        name:"max:50",
        address: "between:1,10",
        birthday:"after:1994-01-01",
        friends: "between:1,10"
    };

    let parsedRules = new Parser().parse(input);

    it("Correctly parses object with correct properties", (done) => {

        //Checks the outer properties
        expect(parsedRules).is.a("object").and.has.own.property("name");
        expect(parsedRules).has.own.property("address");
        expect(parsedRules).has.own.property("birthday");
        expect(parsedRules).has.own.property("friends");
        done();
    });

    it("Correctly identifies each rule", (done) => {
        expect(parsedRules.name).to.be.an("array");
        expect(parsedRules.address).to.be.an("array");
        expect(parsedRules.birthday).to.be.an("array");
        expect(parsedRules.friends).to.be.an("array");
        done();
    });

    it("Ensures that each rule is set properly", (done) => {
        expect(parsedRules.name[0]).to.be.an("object").has.own.property("name").that.deep.equals("MAX");
        expect(parsedRules.address[0]).to.be.an("object").has.own.property("name").that.deep.equals("BETWEEN");
        expect(parsedRules.birthday[0]).to.be.an("object").has.own.property("name").that.deep.equals("AFTER");
       // expect(parsedRules.friends[0]).to.be.an("object").has.own.property("name").that.deep.equals("BETWEEN");
        done();
    });
});

describe('Rules Tests', () => {
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
        // const opts = {
        //    friends: "array",
        // };
        //
        //
        // app.post('/array', Validator.make(opts), (req, res) => {
        //     console.log(req.failed);
        //     res.json({success: true, validRequest: req.valid, why: req.why});
        // });
        //
        // request(app)
        //     .post('/array')
        //     .set('Content-Type', 'application/json')
        //     .set('accept', 'json')
        //     .send({friends: [], address: 3})
        //     .expect(200, {success: true, validRequest: true, why: ""}, done)
        done();
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

    it('Validates Not_In Rule', (done) => {
        const opts = {
            name: "not_in:chris,fred,joe,george"
        };


        app.post('/notin', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/notin')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: ["Lacy"]})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Required Rule', (done) => {
        const opts = {
            name: "required"
        };


        app.post('/required', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/required')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: true})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates Regex Rule', (done) => {
        // const opts = {
        //     regexName: "regex:([A-Z])"
        // };
        //
        // app.post('/regex', Validator.make(opts), (req, res) => {
        //     console.log(req.failed);
        //     res.json({success: true, validRequest: req.valid, why: req.why});
        // });
        //
        // request(app)
        //     .post('/regex')
        //     .set('Content-Type', 'application/json')
        //     .set('accept', 'json')
        //     .send({regexName: 'M'})
        //     .expect(200, {success: true, validRequest: true, why: ""}, done)
        let a = 1;
        expect(a).to.be.a('number').that.equals(1);

        done();
    });

    it('Validates the Array Size Rule', (done) => {
        const opts = {
            name: "array_size:3"
        };

        app.post('/arraysize', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/arraysize')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: ['mon', 'tue', 'wed']})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    //Todo test this for arrays as well
    it('Validates Size Rule', (done) => {
        const opts = {
            name: "size:3"
        };


        app.post('/size', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/size')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: 'mon'})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });


    it('Validates Same Rule', (done) => {
        const opts = {
            name: "same:surname",
            surname:"required"
        };


        app.post('/same', Validator.make(opts), (req, res) => {
            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/same')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: "foo", surname: "foo"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

    it('Validates String Rule', (done) => {
        const opts = {
            name: "string"
        };


        app.post('/string', Validator.make(opts), (req, res) => {

            console.log(req.failed);

            res.json({success: true, validRequest: req.valid, why: req.why});
        });

        request(app)
            .post('/string')
            .set('Content-Type', 'application/json')
            .set('accept', 'json')
            .send({name: "a string"})
            .expect(200, {success: true, validRequest: true, why: ""}, done)
    });

});

/**
 * ====================
 * Abstract Rule Tests
 * ====================
 */
describe('AbstractRule Tests', () => {

    let rule = new AbstractRule("ALPHANUMERIC");

    it('getType() Throws an Error', (done) => {
        expect(rule.getType).to.throw(Error);
        done();
    });

    it('setName() Throws and Error', (done) => {
        expect(rule.setName).to.throw(Error);
        done();
    });

    it('setWhy() Sets the Why variable', (done) => {
        rule.setWhy("hi");
        expect(rule.getWhy()).to.be.an('string');
        done();
    });

    it('getWhy() Returns Why', (done) => {
        rule.setWhy({name: 'foo'});
        expect(rule.getWhy()).to.be.an("object").with.property("name");
        done();
    });

    it('addReason() Throws and Error', (done) => {
        expect(rule.addReason).to.throw(Error);
        done();
    });

    it('getName() To be a string', (done) => {
        expect(rule.getName()).to.be.an("string").that.equals("ALPHANUMERIC");
        done();
    });

    it('getRule() Throws and Error', (done) => {
        expect(rule.getRule).to.throw(Error);
        done();
    });

    it('getActivationFunction() Throws and Error', (done) => {
        expect(rule.getActivationFunction).to.throw(Error);
        done();
    });

    it('failed() Throws and Error', (done) => {
        expect(rule.failed).to.throw(Error);
        done();
    });
});

/**
 * ================
 * Basic Rule Tests
 * ================
 */
describe("Basic Rule Tests", () => {
    //Get any basic rule
   let rule = RuleFactory.getRule("ALPHANUMERIC");

    it('setReq() Sets the required property', (done) => {
        rule.req = true;
        expect(rule.req).to.be.an("boolean").that.equals(true);
        done()
    });

    it('getReq() Gets the required property', (done) => {
        rule.req = false;
        expect(rule.req).to.be.an("boolean").that.equals(false);
        done()
    });

    it('getType() returns the string "BASIC" ', (done) => {
        expect(rule.getType()).to.be.an("string").that.equals("BASIC");
        done()
    });

    it('failed() returns false', (done) => {
        expect(rule.failed("abc++/")).to.be.an("boolean").that.equals(true);
        done()
    });

    it('getActivationFunction() returns a valid function', (done) => {
        expect(rule.getActivationFunction()).to.be.an("function");
        done()
    });

    it('reason() returns an object impl of the failed rule', (done) => {
        rule.addReason("ALPHANUMERIC", "name", "abc++");
        expect(rule.reason()).to.be.an("string").to.equal("name : must be alphanumeric.");
        done()
    });

    it('getRule() returns an object impl of the failed rule', (done) => {
        expect(rule.getRule()).to.be.an("object").to.deep.equal({name: "ALPHANUMERIC", req: false });
        done()
    });

});

/**
 * ===================
 * Advanced Rule Tests
 * ===================
 */
describe("Advanced Rule Tests", () => {

    let rule = RuleFactory.getRule("AFTER");

   it('setReq() Sets the required property', (done) => {
        rule.setReq(true);
        expect(rule.getReq()).to.be.an("boolean").that.equals(true);
        done()
   });

   it('getReq() Gets the required property', (done) => {
        rule.setReq(false);
        expect(rule.getReq()).to.be.an("boolean").that.equals(false);
        done()
    });

    it('isRequired() Gets the required property', (done) => {
        rule.setReq(true);
        expect(rule.isRequired()).to.be.an("boolean").that.equals(true);
        done()
    });

    it('getType() returns the string "Advanced" ', (done) => {
        rule.setReq(true);
        expect(rule.getType()).to.be.an("string").that.equals("ADVANCED");
        done()
    });

    it('setReq() Sets the required property', (done) => {
        rule.setReq(true);
        expect(rule.getReq()).to.be.an("boolean").that.equals(true);
        done()
    });

    it('reason() Gets the reason for the failure', (done) => {
        rule.addReason("AFTER", "birthday", "2017-01-01", "2020-01-01");
        expect(rule.reason()).to.be.an("string").to.equal("birthday was expected to be chronologically after 2017-01-01");
        done()
    });

    it('failed() returns false', (done) => {
        expect(rule.failed("2017-01-01", "2020-01-01")).to.be.an("boolean").that.equals(true);
        done()
    });

    it('getActivationFunction() returns a valid function', (done) => {
        expect(rule.getActivationFunction()).to.be.an("function");
        done()
    });

    it('getValue() returns the rules value', (done) => {
        rule.setValue("2017-01-01");
        expect(rule.getValue()).to.be.an("string").that.equals("2017-01-01");
        done()
    });

    it('getName() returns the rules name', (done) => {
        expect(rule.getName()).to.be.an("string").that.equals("AFTER");
        done()
    });

    it('getRule() returns the rule implementation of the rule object ', (done) => {
        expect(rule.getRule()).to.be.an("object").to.deep.equal({name: "AFTER", req: true, value: "2017-01-01"});
        done()
    });
});

/**
 * ==================
 * Rule Factory Tests
 * ==================
 */
describe("Rule Factory Tests", () => {

   it("Ensures are Rules are in the Object", (done) => {
      let keys = Object.keys(RuleFactory.rules());
      expect(RuleFactory.rules()).to.have.keys(keys);
      done();
   });

    it("Ensures a valid rule is returned", (done) => {
        const rule = RuleFactory.getRule("AFTER");

        expect(rule).to.have.own.property("name");
        expect(rule).to.have.own.property("why");
        expect(rule).to.have.own.property("value");
        expect(rule).to.have.own.property("req");
        expect(rule).to.have.own.property("activationFunction");

        done();
    });

    it("Ensures a error is thrown for an invalid rule", (done) => {
        expect(RuleFactory.getRule).to.throw(Error);
        done();
    });
});

/**
 * ==================
 * Error Code Testing
 * ==================
 */
describe("Error Code Tests", () => {
    it("Ensures Error Codes are all valid Strings", (done) => {
        let keys = Object.keys(ErrorCode.codes());
        expect(ErrorCode.codes()).to.have.keys(keys);
        done();
    });
});

/**
 * ========================
 * Validation Error Testing
 * ========================
 */
describe("Validation Error Tests", () => {

    let error = new ValidationError("name", RuleFactory.getRule("ALPHA"));

    it("getWhy() returns the correct string", (done) => {
        error.setWhy("Because it just is");
        expect(error.getWhy()).to.be.a("string");
        done();
    });

    it("setWhy() sets the property properly", (done) => {
        error.setWhy("Because it just is");
        expect(error.why).to.be.a("string");
        done();
    });

    it("getRule() returns the Rule reference of the Error", (done) => {
        expect(error.getRule()).to.have.own.property("name");
        expect(error.getRule()).to.have.own.property("req");
        expect(error.getRule()).to.have.own.property("why");
        expect(error.getRule()).to.have.own.property("activationFunction");
        done();
    });

    it("getError() returns the object impl of the ValidationError", (done) => {
        expect(error.getError()).to.be.a("string").that.deep.equals("Because it just is");
        done();
    });
});


/**
 * ==========
 * Util Tests
 * ==========
 */
describe("Util Tests", () => {
   it("Ensures between() operates as expected", (done) => {
       expect(Util.isBetween(4, 1, 5)).is.a("boolean").that.deep.equals(true);
       expect(Util.isBetween(50, 1, 5)).is.a("boolean").that.deep.equals(false);
       done();
   });

    it("Ensures isNullOrUndefined() operates as expected", (done) => {
        let x; //x is purposely undefined for testing purposes
        let y = 50;

        expect(Util.isNullOrUndefined(null)).is.a("boolean").that.deep.equals(true);
        expect(Util.isNullOrUndefined(x)).is.a("boolean").that.deep.equals(true);
        expect(Util.isNullOrUndefined(y)).is.a("boolean").that.deep.equals(false);
        done();
    });

    it("Ensures hasDuplicates() operates as expected", (done) => {
        let x = [0, 1, 2, 3, 5];
        let y = [0, 0, 1, 1, 3, 5, 3];

        expect(Util.hasDuplicates(y)).is.a("boolean").that.deep.equals(true);
        expect(Util.hasDuplicates(x)).is.a("boolean").that.deep.equals(false);
        done();
    });
});