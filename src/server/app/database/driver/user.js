const UserModel = require('../models/User');
const logs = require('@logs');
const DB = require('../abstractDriver');

module.exports.create = {
    basic: (data) => DB.create(UserModel, data),
}
module.exports.remove = {
    byId: (id) => DB.remove.byId(UserModel, id),
    byEmail: (email) => DB.remove.byQuery(UserModel, {email: email})
}

module.exports.get = {
    async byToken(name, token) {
        const user = await DB.get.byId(UserModel, token.id);
        if (user && user.verifyToken(name, token)) return user;
        else return null;
    },
    async byCredentials(email, password) {
        let user = await DB.get.oneByQuery(UserModel, {email: email});
        if (user && await user.comparePasswords(password)) {
            return user;
        } else {
            return null;
        }
    },
    async byId(id) {
        return DB.get.byId(UserModel, id);
    },
    async byEmail(email) {
        return DB.get.oneByQuery(UserModel, {email: email});
    }
}