const chai = require("chai"),
    expect = chai.expect,
    Utils=require("@test/utils"),
    server = require("@server/bin/www"),
    UserDB = require("@DB").UserDriver.model,
    serverConfig = require("@config");


describe("/token", () => {
    let USER = Utils.generateUser();
    let refresh;
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
                refresh = res.body.tokens.refresh;
                done();
            });
    });
    describe("valid args", () => {
        it("should return new valid token", (done) => {
            chai.request(server)
                .post(Utils.URL.TOKEN)
                .set("authorization", `Bearer ${refresh}`)
                .end((err, res) => {
                    expect(res).have.status(200);
                    expect(res.body).include.all.keys(["token"]);
                    expect(res.body.token).to.be.a("string");
                    chai.request(server)
                        .post(Utils.URL.CHECK)
                        .set("authorization", `Bearer ${res.body.token}`)
                        .end((err, res) => {
                            expect(res).have.status(200);
                            done();
                        });
                });
        });
        it("should return true, even user created new token", (done) => {
            chai.request(server)
                .post(Utils.URL.TOKEN)
                .set("authorization", `Bearer ${refresh}`)
                .end(() => {
                    chai.request(server)
                        .post(Utils.URL.TOKEN)
                        .set("authorization", `Bearer ${refresh}`)
                        .end((err, res) => {
                            expect(res).have.status(200);
                            done();
                        });
                });
        });
    });
    describe("invalid args", () => {
        it("should reject, if refresh token is invalid", (done) => {
            chai.request(server)
                .post(Utils.URL.TOKEN)
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
                        .post(Utils.URL.TOKEN)
                        .set("authorization", `Bearer ${refresh}`)
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
                    .set("authorization", `Bearer ${refresh}`)
                    .end((err, res) => {
                        expect(res).have.status(401);
                        done();
                    });
            }, serverConfig.security.tokenLife.REFRESH * 1000);
        });
    });
    after((done) => {
        UserDB.remove({}, err => done(err));
    });
});