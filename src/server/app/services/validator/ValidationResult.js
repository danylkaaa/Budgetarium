/**
 * defines class of validation result
 */
class ValidationResult {
    constructor(valid, message) {
        this.valid = valid;
        if (valid) {
            this.message = message || "Validation failed";
        }
    }
}

module.exports = ValidationResult;