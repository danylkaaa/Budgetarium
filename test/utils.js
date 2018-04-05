const faker = require("faker"),
    chai = require("chai"),
    server = require("@server/bin/www");

module.exports = {
    URL: {
        SIGNIN: "/api/v1/auth/signin",
        SIGNUP: "/api/v1/auth/signup",
        CHECK: "/api/v1/auth/check-token",
        LOGOUT: "/api/v1/auth/logout",
        TOKEN: "/api/v1/auth/token",
        users: {
            GET: "/api/v1/users"
        }
    },
    generateUser() {
        return {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password() + 3
        };
    },
    registerUser(userData = this.generateUser()) {
        return new Promise((resolve, reject) => {
            chai.request(server)
                .post(this.URL.SIGNUP)
                .send(userData)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }
};