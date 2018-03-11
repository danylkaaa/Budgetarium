var bcrypt = require("bcrypt");
module.exports = {
    /**
     * get hash of string, with this salt
     * @param plainData plain string to hashed
     * @param salt salt for hashing
     * @returns Promise(String) hex-string with hashed data
     */
    hash: (plainData, salt) => {
        return bcrypt.hash(plainData, salt);
    },
    /**
     * Compare two strings, plain and hashed
     * @param plainData plain string to compare
     * @param hash hashed string to compare
     * @returns Promise(boolean)  is two strings are equals
     */
    compare: (plainData, hash) => {
        return bcrypt.compare(plainData, hash);
    },
    /**
     * return random generated string
     * @param length count of bytes in string
     * @returns {string} random generated string
     */
    random: (length) => {
        return bcrypt.genSalt(length);
    }
};