const crypto = require("crypto");
module.exports = {
    /**
     * get hash of string, with this salt
     * @param plainData plain string to hashed
     * @param salt salt for hashing
     * @returns {String} hex-string with hashed data
     */
    hash: (plainData, salt) => {
        return crypto
            .createHmac("sha512", salt)
            .update(plainData)
            .digest("hex");
    },
    /**
     * Compare two strings, plain and hashed
     * @param plainData plain string to compare
     * @param hash hashed string to compare
     * @param salt salt for crypting
     * @returns {boolean} is two strings are equals
     */
    compare: (plainData, hash, salt) => {
        return this.crypto.hash(plainData, salt) == hash;
    },
    /**
     * return random generated string
     * @param length count of bytes in string
     * @returns {string} random generated string
     */
    random: (length) => {
        return crypto
            .randomBytes(length + 1)
            .toString("base64").substr(0, length);
    }
};