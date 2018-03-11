const chai = require("chai");
const expect = chai.expect;
const server = require("@server/bin/www");
const faker = require("faker");
const UserDB = require("@DB").UserDriver.model;
const URL = "/api/v1/auth/signup";
const ObjectId = require("mongoose").Types.ObjectId;

function generateUser() {
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

describe("/signup", () => {
    beforeEach((done) => {
        UserDB.remove({}, err => done(err));
    });
    describe("send valid user", () => {
        it("should create user, with specified valid fields", (done) => {
            let user = generateUser();
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.have.property("user").that.be.a("object");
                    expect(res.body.user).to.not.include.any.keys("password", "salt");
                    expect(res.body.user).to.have.property("name").that.equal(user.name);
                    expect(res.body.user).to.have.property("email").that.equal(user.email);
                    expect(res.body.user).to.have.property("id").that.be.a("string");
                    expect(ObjectId.isValid(res.body.user.id)).to.be.true;
                    expect(res.body.user).to.have.property("role").that.equal("user");
                    done();
                });
        });
        it("should generate & send valid tokens", (done) => {
            let user = generateUser();
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).to.have.property("tokens").that.be.an("object");
                    expect(res.body.tokens).to.include.all.keys("access", "refresh");
                    expect(res.body.tokens.access).to.be.a("string");
                    expect(res.body.tokens.refresh).to.be.a("string");
                    expect(res.body.tokens.access).to.not.equal(res.body.tokens.refresh);
                    done();
                });
        });
        it("should encrypt password", (done) => {
            let user = generateUser();
            chai.request(server)
                .post(URL)
                .send(user)
                .end(async () => {
                    let createdUser = await UserDB.findOne({email: user.email}).exec();
                    expect(createdUser).to.have.property("password");
                    expect(createdUser.password).to.be.a("string");
                    expect(createdUser.password).to.be.not.empty;
                    expect(createdUser.password).to.be.not.equal(user.password);
                    done();
                });
        });
    });
    describe("reject if send invalid name", () => {
        it("excluded from request", (done) => {
            let user = generateUser();
            delete user.name;
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("empty", (done) => {
            let user = generateUser();
            user.name = "";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("starts with number", (done) => {
            let user = generateUser();
            user.name = "123 Dima";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("ends  with number", (done) => {
            let user = generateUser();
            user.name = "Dima123";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("starts with lowercase letter", (done) => {
            let user = generateUser();
            user.name = "dima";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("too short name", (done) => {
            let user = generateUser();
            user.name = "D";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
    });
    describe("reject if send invalid email", () => {
        it("excluded from request", (done) => {
            let user = generateUser();
            delete user.email;
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("empty", (done) => {
            let user = generateUser();
            user.email = "";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("starts with number", (done) => {
            let user = generateUser();
            user.email = "1";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("ends with number", (done) => {
            let user = generateUser();
            user.email += "1";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
    });
    describe("reject if send invalid password", () => {
        it("too short", (done) => {
            let user = generateUser();
            user.password = "1";
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("too long", (done) => {
            let user = generateUser();
            user.password = "1As".repeat(10);
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("doesn't contain any digits", (done) => {
            let user = generateUser();
            user.password = "As".repeat(5);
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("doesn't contain any uppercase letter", (done) => {
            let user = generateUser();
            user.password = "4s".repeat(5);
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("doesn't contain any lowercase letter", (done) => {
            let user = generateUser();
            user.password = "4S".repeat(5);
            chai.request(server)
                .post(URL)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
    });
});