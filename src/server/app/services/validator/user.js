const config = require("@config");
const ValidationResult = require("./ValidationResult");


/**
 * validates user"s name
 * @param value value for validation
 * @return {ValidationResult} object, that describes validation
 */
function name(value) {
    const nameRegex = /^([A-Z][A-Za-z]{1,20}?\s?)+$/;
    return new ValidationResult(nameRegex.test(value), "Name should contain only letters and start with uppercase letter");
}

/**
 * validates user"s email
 * @param value value for validation
 * @return {ValidationResult} object, that describes validation
 */
function email(value) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return new ValidationResult(emailRegex.test(value), "Email is not a valid string");

}

const validators = {
    name,
    email
};

/**
 * checks, is value is allowed for specified path
 * @param value value to check
 * @param destination path of validation
 * @return {ValidationResult} object, that describes validation
 */
function validate(value, destination) {
    let endpoint = destination[destination.length - 1];
    if (validators[endpoint]) {
        return validators[endpoint](value);
    } else {
        return new ValidationResult(true);
    }
}


module.exports = validate;