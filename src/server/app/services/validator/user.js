const logs = require('@logs')(module);
const config = require('@config');


/**
 * validates user's displayedName
 * @param value value for validation
 * @return {boolean} true, if value is valid
 */
function displayedName(value) {
    const displayedNameRegexp = new RegExp(config.validationRules.user.displayedName);
    return displayedNameRegexp.test(value);
}

const validators = {
    displayedName
}

/**
 * checks, is value is allowed for specified path
 * @param value value to check
 * @param destination path of validation
 * @return {boolean} true, if value is valid
 */
function validate(value, destination) {
    let endpoint = destination[destination.length - 1];
    let result = true;
    if (validators[endpoint]) {
        result = validators[endpoint](value);
    }
    return result;
}


module.exports = validate;