const chai = require("chai"),
    expect = chai.expect,
    server = require("@server/bin/www"),
    faker = require("faker"),
    UserDB = require("@DB").UserDriver.model,
    URLSignin = "/api/v1/auth/signin",
    URLSignup = "/api/v1/auth/signup",
    URLCheck= "/api/v1/auth/check";

function generateUser() {
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

describe("/check", () => {
    let USER = generateUser();
    let tokens;
    before((done) => {
        chai.request(server)
            .post(URLSignup)
            .send(USER)
            .end((err, res) => {
                tokens = res.body.tokens;
                done();
            });
    });
    describe("refresh", () => {
        describe("valid args", () => {
            it("should return true, if token is correct and actual", (done) => {
                chai.request(server)
                    .post(URLCheck)
                    .set("authorization", `Bearer ${tokens.refresh}`)
                    .end((err, res) => {
                        expect(res).have.status(200);
                        done();
                    });
            });
            it("should return true, even user created new token", (done) => {
                chai.request(server)
                    .post(URLSignin)
                    .auth(USER.email, USER.password)
                    .end(() => {
                        chai.request(server)
                            .post(URLCheck)
                            .set("authorization", `Bearer ${tokens.refresh}`)
                            .end((err, res) => {
                                expect(res).have.status(200);
                                done();
                            });
                    });
            });
        });
    });

    describe("invalid args", () => {
        it("reject if user doesn't exist", (done) => {
            const newUser = generateUser();
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