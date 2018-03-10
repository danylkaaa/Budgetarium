function errorHandler(err, res, req, next) {
    switch (err.name) {
    case "ValidationError":
        err.message =getErrorOnValidation(err);
        err.status = 400;
        next(err);
        break;
    case "MongoError":
        err.message = "Duplicate key is not allowed";
        err.status = 400;
        next(err);
        break;
    default:
        return next(err);
    }
}
function getErrorOnValidation (err) {
    let msg = [];
    for (let field in err.errors) {
        msg.push(err.errors[field].message);
    }
    return msg;
}
module.exports = errorHandler;