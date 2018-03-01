const Utils = require('@utils');
const logs = require('@logs')(module);
const validators = Utils.loadModulesFromDir(__dirname);


/**
 * checks, is value is allowed for specified path
 * @param value value to check
 * @param path path of validation
 * @return {boolean} true, if value is valid
 */

function validate(value, path) {
    logs.debug(validators);
    let destination = path.split('.');
    let result = true;
    if (validators[destination[0]]) {
        result = Boolean(validators[destination[0]](value, destination));
    }
    logs.debug(`validate '${value}' in path '${path}': ${result}`);
    return result;
}

module.exports = validate;