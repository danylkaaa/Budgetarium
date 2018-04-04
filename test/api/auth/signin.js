const chai = require("chai"),
    expect = chai.expect,
    server = require("@server/bin/www"),
    Utils=require("@test/utils"),
    UserDB = require("@DB").UserDriver.model,
    URLSignin = "/api/v1/auth/signin",
    URLSignup = "/api/v1/auth/signup";

describe("/signin", () => {
    let USER = Utils.generateUser();
    before((done) => {
        chai.request(server)
            .post(URLSignup)
            .send(USER)
            .end(() => done());
    });
    describe("valid args", () => {
        it("should return user tokens", (done) => {
            chai.request(server)
                .post(URLSignin)
                .auth(USER.email, USER.password)
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
        it("should return new tokens each times", (done) => {
            chai.request(server)
                .post(URLSignin)
                .auth(USER.email, USER.password)
                .end((err1, res1) => {
                    setTimeout(() => chai.request(server)
                        .post(URLSignin)
                        .auth(USER.email, USER.password)
                        .end((err1, res2) => {
                            expect(res2.body.tokens.access).to.not.equal(res1.body.tokens.access);
                            expect(res2.body.tokens.refresh).to.not.equal(res1.body.tokens.refresh);
                            done();
                        }), 1000);
                });
        });
    });
    describe("invalid args", () => {
        it("reject if user doesn't exist", (done) => {
            const newUser = Utils.generateUser();
            chai.request(server)
                .post(URLSignin)
                .auth(newUser.email, newUser.password)
                .end((err, res) => {
                    expect(res).have.status(401);
                    done();
                });
        });
        it("reject if password is invalid", (done) => {
            chai.request(server)
                .post(URLSignin)
                .auth(USER.email, USER.password + 123)
                .end((err, res) => {
                    expect(res).have.status(401);
                    done();
                });
        });
    });
    after((done) => {
        UserDB.remove({}, err => done(err));
    });
});