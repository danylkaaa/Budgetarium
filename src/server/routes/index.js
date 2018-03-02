var express = require('express');
var router = express.Router();
const APIRouter = require('@API');
const logs = require('@logs')(module);
const path=require('path');

// API processing
router.use('/api', APIRouter);

// send root file
router.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    logs.debug('Not fount URL: %s', req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
router.use(function (err, req, res, next) {
    logs.error('Internal error(%d): %s', res.statusCode, err.message);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || "Server error",
        code: err.status || 500
    });
});

logs.info("configured");


module.exports = router;
