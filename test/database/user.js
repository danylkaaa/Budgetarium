require("module-alias/register");

const chai = require("chai");
const chaiHttp = require("chai-http");
const chaiPromised = require("chai-as-promised");
const expect = chai.expect;
require("@server/bin/www");
const UserDB = require("../../src/server/app/database/driver/user");
const UserModel = require("../../src/server/app/database/models/User");
const faker = require("faker");
chai.use(chaiHttp);
chai.use(chaiPromised);

describe("User DB", () => {
    beforeEach((done) => {
        //Перед каждым тестом чистим базу
        UserModel.remove({}, err => done(err));
    });

    describe("User DB", () => {
        it("should create user with correct fields", async () => {
            let userData = {
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            let user = await UserDB.create.basic(userData);
            expect(user).to.be.a("object");
            expect(user).to.have.property("name").that.eql(userData.name);
            expect(user).to.have.property("email").that.eql(userData.email);
            expect(user.salt).to.be.a("string");
            expect(user).not.include.key("password");
            expect(user).to.have.property("secrets").that.a("object");
            expect(user.secrets).to.include.all.keys("access", "refresh");
            expect(user.secrets.access).to.be.a("string");
            expect(user.secrets.refresh).to.be.a("string");
        });
        it("should throw an error, if receive empty data", async () => {
            expect(UserDB.create.basic({})).be.eventually.throw();
        });
        // it("should throw an error, if receive invalid email", async () => {
        //     let userData = {
        //         name: faker.internet.userName(),
        //         email: "123",
        //         password: faker.internet.password()
        //     };
        //     expect(UserDB.create.basic(userData)).to.be.rejected();
        // });
    });
});