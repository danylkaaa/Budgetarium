var router = require('express').Router();
const UserDB = require('@DB').UserDriver;
const logs = require('@logs')(module);
const Utils = require('@utils');
const config = require('@config');

router.post('/register',
    (req, res, next) => {
        req.args = {name, email, password} = req.body;
        next();
    },
    async (req, res, next) => {
        try {
            let user = await UserDB.create.basic(req.args);
            logs.debug('User registered');
            return res.json({
                user: user.info,
                tokens: user.getNewTokens()
            });
        } catch (err) {
            logs.error(err);
            next(err);
        }
    });

module.exports = router;