var router = require("express").Router();
const UserDB = require("@DB").UserDriver;
const logs = require("@logs")(module);
const passport = require("passport");
// const Utils = require("@utils");
// const config = require("@config");

router.post("/signup",
    (req, res, next) => {
        req.args = {name, email, password} = req.body;
        next();
    },
    async (req, res, next) => {
        try {
            let user = await UserDB.create.basic(req.args);
            logs.debug("User registered");
            return res.json({
                user: user.info,
                tokens: user.getNewTokens()
            });
        } catch (err) {
            logs.error(err);
            next(err);
        }
    });

router.post("/signin",
    passport.authenticate(["basic"],{session:false}),
    (req, res) => {
        return res.json({
            tokens: req.user.getNewTokens()
        });
    });

router.post("/check",
    passport.authenticate(["access-token", "refresh-token", "basic"],{session:false}),
    (req, res) => {
        return res.json({success: true});
    });

router.post("/logout",
    passport.authenticate(["basic"],{session:false}),
    async (req, res) => {
        await Promise.all([req.user.generateSecret("access"), req.user.generateSecret("refresh")]);
        await req.user.save();
        res.end();
    }
);

module.exports = router;