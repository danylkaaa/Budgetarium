const Utils = require("@utils");
const logs = require("@logs")(module);
const validators = Utils.loadModulesFromDir(__dirname);
const ValidationResult = require("./ValidationResult");

/**
 * checks, is value is allowed for specified path
 * @param value value to check
 * @param path path of validation
 * @return {boolean} true, if value is valid
 */

function validate(value, path) {
    let destination = path.split(".");
    if (validators[destination[0]]) {
        return validators[destination[0]](value, destination);
    } else {
        new ValidationResult(true);
    }
}

module.exports = validate;