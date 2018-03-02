let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server/bin/www');
let should = chai.should();
let UserDB = require('../src/server/app/database/models/User');
chai.use(chaiHttp);


describe('/auth', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        UserDB.remove({}, err => done());
    });

    describe('/register', () => {
        it('it should return correct user', (done) => {
            let user = {
                name: "Ann Watson",
                email: "test1@tests.com",
                password: "zqwexrty"
            }
            let createdOn = Date.now();
            chai.request(server)
                .post('/api/v1/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.include.keys('user', 'tokens');
                    res.body.user.should.have.all.keys('name', 'role', 'email', 'id', 'created');
                    res.body.user.name.should.equal(user.name);
                    res.body.user.email.should.equal(user.email);
                    res.body.user.role.should.equal('user');
                    Date.parse(res.body.user.created).should.below(createdOn);
                    done();
                });
        });
        it('it should return correct tokens', (done) => {
            let user = {
                name: "Ann Watson",
                email: "test1@tests.com",
                password: "zqwexrty"
            }
            chai.request(server)
                .post('/api/v1/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.tokens.should.have.all.keys('access', 'refresh');
                    res.body.tokens.access.should.be.a('string');
                    res.body.tokens.refresh.should.be.a('string');
                    done();
                });
        });

    });
});