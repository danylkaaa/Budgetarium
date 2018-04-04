const faker = require("faker");
module.exports = {
    generateUser() {
        return {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password() + 3
        };
    }
};