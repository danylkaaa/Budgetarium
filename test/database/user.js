let chai = require("chai");
let chaiHttp = require("chai-http");
let assert = chai.assert;
let UserDB = require("../../src/server/app/database/driver/user");
let UserModel = require("../../src/server/app/database/models/User");
let faker = require("faker");
chai.use(chaiHttp);


describe("User DB", () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        UserModel.remove({}, err => done(err));
    });

    describe("CREATE new user", () => {
        it("it should create correct user", async () => {
            let userData = {
                name: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            let user = await UserDB.create.basic(userData);
            assert.isObject(user, "Created user is object");
            assert.include(user, {name: userData.name, email: userData.email});
            assert.isString(user.salt, "Salt is string");
            assert.isNull(user.password, "Plain password is not stored in DB ");
            // assert.isObejct(user.secrets);
            // user.secrets.should.include.all.keys("access", "refresh");
            // user.secrets.access.should.be.a("string");
            // user.secrets.refresh.should.be.a("string");
        });
        it("it should require user's email", async () => {
            let userData = {
                name: faker.internet.userName(),
                password: faker.internet.password()
            };
            await assert.throws(()=>UserDB.create.basic(userData));
            // require("mongoose").Types.ValidationError
        });
    });
});