const chai = require("chai"),
    expect = chai.expect,
    server = require("@server/bin/www"),
    Utils=require("@test/utils"),
    UserDB = require("@DB").UserDriver.model,
    serverConfig = require("@config");


function runBearerTest(name) {
    describe(`/${name}`, () => {
        let USER = Utils.generateUser();
        let token;
        before((done) => {
            chai.request(server)
                .post(Utils.URL.SIGNUP)
                .send(USER)
                .end(done);
        });
        beforeEach((done) => {
            chai.request(server)
                .post(Utils.URL.SIGNIN)
                .auth(USER.email, USER.password)
                .end((err, res) => {
                    token = res.body.tokens[name];
                    done();
                });
        });
        describe("valid args", () => {
            it("should return true, if token is correct and actual", (done) => {
                chai.request(server)
                    .post(Utils.URL.CHECK)
                    .set("authorization", `Bearer ${token}`)
                    .end((err, res) => {
                        expect(res).have.status(200);
                        done();
                    });
            });
            it("should return true, even user had created a new token", (done) => {
                chai.request(server)
                    .post(Utils.URL.SIGNIN)
                    .auth(USER.email, USER.password)
                    .end(() => {
                        chai.request(server)
                            .post(Utils.URL.CHECK)
                            .set("authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                expect(res).have.status(200);
                                done();
                            });
                    });
            });
        });
        describe("invalid args", () => {
            it("should reject, if token invalid", (done) => {
                chai.request(server)
                    .post(Utils.URL.CHECK)
                    .set("authorization", "Bearer 123")
                    .end((err, res) => {
                        expect(res).have.status(401);
                        done();
                    });
            });
            it("should reject, if user had set secret", (done) => {
                chai.request(server)
                    .post(Utils.URL.LOGOUT)
                    .auth(USER.email, USER.password)
                    .end(() => {
                        chai.request(server)
                            .post(Utils.URL.CHECK)
                            .set("authorization", `Bearer ${token}`)
                            .end((err, res) => {
                                expect(res).have.status(401);
                                done();
                            });
                    });
            });
            it("should reject, if token is outdated", (done) => {
                setTimeout(() => {
                    chai.request(server)
                        .post(Utils.URL.CHECK)
                        .set("authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            expect(res).have.status(401);
                            done();
                        });
                }, serverConfig.security.tokenLife[name.toUpperCase()] * 1000);
            });
        });
        after((done) => {
            UserDB.remove({}, err => done(err));
        });
    });
}

describe("/check", () => {
    runBearerTest("access");
    runBearerTest("refresh");
});