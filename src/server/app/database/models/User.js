"use strict";
const Mongoose = require("mongoose");
const Utils = require("@utils");
const config = require("@config");
const validator = require("@validator");

// defines new Schema
let User = new Mongoose.Schema({
    name: {
        trim: true,
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                let result = validator(v, "user.name");
                cb(result.valid, result.message);
            }
        },
        message: "Validation failed"
    },
    email: {
        trim: true,
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                let result = validator(v, "user.email");
                cb(result.valid, result.message);
            }
        },
        message: "Validation failed"
    },
    created: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: true
    },
    // facebook: {
    //     access: String,
    //     refresh: String,
    //     id: String,
    //     picture: String,
    //     email: String,
    //     name: String
    // },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    secrets: {
        access: {
            type: String
        },
        refresh: {
            type: String
        }
    },
});

// add plugin do Schema
User.plugin(require("mongoose-paginate"));

// make new index in database by username
User.index({email: 1}, {unique: true});


/**
 * check is path 'password' is required
 * @param user ref to user
 * @returns {*|boolean} true, if path is required
 */
function passwordIsRequired(user) {
    return !user._password;
}

/**
 * Before save a user document, Make sure:
 * 1. Hash user"s password
 * 2. Regenerate secrets
 */
User.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        let result = validator(this.password, "user.password");
        if (!result.valid) {
            throw this.invalidate("password", result.message, this.password);
        }
        this.password = await Utils.crypto.hash(this.password, 10);
        await Promise.all([this.generateSecret("access"), this.generateSecret("refresh")]);
    }
    next();
});

/**
 * generate new token"s secret for user
 * @param name name of token
 */
User.methods.generateSecret = async function (name) {
    this.secrets[name] = await Utils.crypto.random(config.security.TOKEN_SECRET_LENGTH);
};

/**
 * compare, is this user, has such password
 * @param password plain string with string
 * @returns {boolean} is the password used by the user
 */
User.methods.comparePasswords = function (password) {
    return Utils.crypto.compare(password, this.password, this.salt);
};

/**
 * generates new pair of tokens and returns them
 * @return {{access: *, refresh: *}} generated tokens
 */
User.methods.getNewTokens = function () {
    return {
        access: this.nextAccessToken,
        refresh: this.nextRefreshToken
    };
};

//create new virtual property
User.virtual("isAdmin").get(function () {
    return this.role == "admin";
});
/**
 * define virtual property, nextAccessToken, generate token
 */
User.virtual("nextAccessToken").get(function () {
    return Utils.tokens.generate("access", this.payloadAccess);
});

/**
 * define virtual property, nextRefreshToken, generate token
 */
User.virtual("nextRefreshToken").get(function () {
    return Utils.tokens.generate("refresh", this.payloadRefresh);
});

/**
 * define virtual property, payload for access token generation
 */
User.virtual("payloadAccess").get(function () {
    return {
        id: this.id,
        secret: this.secrets.access
    };
});

/**
 * define virtual property, payload for refresh token generation
 */
User.virtual("payloadRefresh").get(function () {
    return {
        id: this.id,
        secret: this.secrets.refresh
    };
});
/**
 * check, is token valid
 * @param name name of token, eq. "access" or "refresh"
 * @param decode string with decoded token
 * @returns {boolean} is token is valid
 */
User.methods.verifyToken = function (name, decode) {
    return decode.secret == this.secrets[name];
};

User.virtual("displayedName").get(function () {
    return this.name;
});

User.virtual("info").get(function () {
    return {
        email: this.email,
        id: this._id,
        name: this.displayedName,
        role: this.role,
        created: this.created
    };
});
// create an user model
let UserModel = Mongoose.model("User", User);
module.exports = UserModel;