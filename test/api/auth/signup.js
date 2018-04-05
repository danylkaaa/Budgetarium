const chai = require("chai"),
    expect = chai.expect,
    server = require("@server/bin/www"),
    Utils=require("@test/utils"),
    UserDB = require("@DB").UserDriver.model,
    ObjectId = require("mongoose").Types.ObjectId;

describe("/signup", () => {
    beforeEach((done) => {
        UserDB.remove({}, err => done(err));
    });
    describe("send valid user", () => {
        it("should create user, with specified valid fields", (done) => {
            let user = Utils.generateUser();
            chai.request(server)
                .post(Utils.URL.SIGNUP)
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
            let user = Utils.generateUser();
            chai.request(server)
                .post(Utils.URL.SIGNUP)
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
            let user = Utils.generateUser();
            chai.request(server)
                .post(Utils.URL.SIGNUP)
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
            let user = Utils.generateUser();
            delete user.name;
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("empty", (done) => {
            let user = Utils.generateUser();
            user.name = "";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("starts with number", (done) => {
            let user = Utils.generateUser();
            user.name = "123 Dima";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("ends  with number", (done) => {
            let user = Utils.generateUser();
            user.name = "Dima123";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("starts with lowercase letter", (done) => {
            let user = Utils.generateUser();
            user.name = "dima";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("too short name", (done) => {
            let user = Utils.generateUser();
            user.name = "D";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
    });
    describe("reject if send invalid email", () => {
        it("user already exits", (done) => {
            let user = Utils.generateUser();
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end(() => {
                    chai.request(server)
                        .post(Utils.URL.SIGNUP)
                        .send(user)
                        .end((err, res) => {
                            expect(res).have.status(400);
                            done();
                        });
                });
        });
        it("excluded from request", (done) => {
            let user = Utils.generateUser();
            delete user.email;
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("empty", (done) => {
            let user = Utils.generateUser();
            user.email = "";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("starts with number", (done) => {
            let user = Utils.generateUser();
            user.email = "1";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("ends with number", (done) => {
            let user = Utils.generateUser();
            user.email += "1";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
    });
    describe("reject if send invalid password", () => {
        it("too short", (done) => {
            let user = Utils.generateUser();
            user.password = "1";
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("too long", (done) => {
            let user = Utils.generateUser();
            user.password = "1As".repeat(10);
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("doesn't contain any digits", (done) => {
            let user = Utils.generateUser();
            user.password = "As".repeat(5);
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("doesn't contain any uppercase letter", (done) => {
            let user = Utils.generateUser();
            user.password = "4s".repeat(5);
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
        it("doesn't contain any lowercase letter", (done) => {
            let user = Utils.generateUser();
            user.password = "4S".repeat(5);
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(user)
                .end((err, res) => {
                    expect(res).have.status(400);
                    done();
                });
        });
    });
});