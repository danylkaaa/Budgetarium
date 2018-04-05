"use strict";
var router = require("express").Router();
const UserDB = require("@DB").UserDriver;
const logs = require("@logs")(module);
// const passport = require("passport");
const Utils = require("@utils");
const config = require("@config");


router.route("/")
    .get(async (req, res, next) => {
        try {
            let pagination = new Utils.Pagination(req.query);
            let metadata = await UserDB.get.byQuery(req.query, pagination.toObj(), config.publicInfo.user);
            return res.json({
                items: metadata.docs,
                total: metadata.total,
                page: metadata.page,
                pages:metadata.pages,
                limit: metadata.limit,
            });
        } catch (err) {
            logs.error(err);
            next(err);
        }
    });


module.exports = router;