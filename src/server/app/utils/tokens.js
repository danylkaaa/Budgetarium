const jwt = require("jsonwebtoken");
const config = require("@config");
module.exports = {
    algorithm: "HS256",
    secret(name) {
        switch (name) {
        case "access":
            return config.security.secrets.ACCESS;
        case "refresh":
            return config.security.secrets.REFRESH;
        default:
            throw new Error("Invalid token name");
        }
    },
    /**
     * generate new token, with specified name and data
     * @param name one of "access" or "refresh"
     * @param data data to store in token
     * @returns {String} string created token
     */
    generate(name, data) {
        return jwt.sign(
            data,
            this.secret(name),
            {
                algorithm: this.algorithm,
                expiresIn: config.security.tokenLife[name.toUpperCase()]
            }
        );
    },
    /**
     * decode token
     * @param name one of "access", "refresh"
     * @param token string with token
     * @returns {{}} decoded token
     */
    decode(name, token) {
        return jwt.verify(
            token,
            this.secret(name),
            {
                algorithms: [this.algorithm]
            }
        );
    }
};