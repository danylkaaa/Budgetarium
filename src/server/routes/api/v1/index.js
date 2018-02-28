var express = require('express');
var router = express.Router();
router.use('*', (req, res, next) => {
    req.json({success: true});
});

module.exports = router;