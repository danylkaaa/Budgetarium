"use strict";
var router = require("express").Router();
const UserDB = require("@DB").UserDriver;
const logs = require("@logs")(module);
const passport = require("passport");
// const Utils = require("@utils");
// const config = require("@config");

router.post("/signup",
    (req, res, next) => {
        let {name, email, password} = req.body;
        req.args={name,email,password};
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

router.post("/check-token",
    passport.authenticate(["access-token","refresh-token"],{session:false}),
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

router.use("/token",
    passport.authenticate(["refresh-token"],{session:false}),
    async (req, res) => {
        res.json({
            token:await req.user.nextAccessToken
        });
    }
);

module.exports = router;