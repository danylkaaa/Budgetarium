'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');
const validator = require('@validator');

// defines new Schema
let User = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                let result = validator(v, 'user.name');
                cb(result.valid, result.message);
            }
        },
        message: 'Validation failed'
    },
    password: {
        type: String,
        require: true
    },
    salt: {
        type: String
    },
    email: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                let result = validator(v, 'user.email');
                cb(result.valid, result.message);
            }
        },
        message: 'Validation failed'
    },
    created: {
        type: Date,
        default: Date.now()
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
        enum: ['user', 'admin'],
        default: 'user'
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
User.plugin(require('mongoose-paginate'));

// make new index in database by username
User.index({email: 1}, {unique: true});

/**
 * Before save a user document, Make sure:
 * 1. Hash user's password
 * 2. Regenerate secrets
 */
User.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.salt = await Utils.crypto.random(32);
        this.password = await Utils.crypto.hash(this.password, this.salt);
        // fill tokens by random bytes
        this.generateSecret('access');
        this.generateSecret('refresh');
    }
    next();
});
/**
 * generate new token's secret for user
 * @param name name of token
 */
User.methods.generateSecret = function (name) {
    this.secrets[name] = Utils.crypto.random(config.security.TOKEN_SECRET_LENGTH);
}

/**
 * compare, is this user, has such password
 * @param password plain string with string
 * @returns {boolean} is the password used by the user
 */
User.methods.comparePasswords = function (password) {
    return Utils.crypto.compare(password, this.password, this.salt);
}

/**
 * generates new pair of tokens and returns them
 * @return {{access: *, refresh: *}} generated tokens
 */
User.methods.getNewTokens = function () {
    return {
        access: this.accessToken,
        refresh: this.refreshToken
    }
}

//create new virtual property
User.virtual('isAdmin').get(function () {
    return this.role == 'admin';
});
/**
 * define virtual property, accessToken, generate token
 */
User.virtual('accessToken').get(function () {
    return Utils.tokens.generate('access', this.payloadAccess);
});

/**
 * define virtual property, refreshToken, generate token
 */
User.virtual('refreshToken').get(function () {
    return Utils.tokens.generate('refresh', this.payloadRefresh);
});

/**
 * define virtual property, payload for access token generation
 */
User.virtual('payloadAccess').get(function () {
    return {
        id: this.id,
        secret: this.secrets.access
    }
});

/**
 * define virtual property, payload for refresg token generation
 */
User.virtual('payloadRefresh').get(function () {
    return {
        id: this.id,
        secret: this.secrets.refresh
    }
});
/**
 * check, is token valid
 * @param name name of token, eq. 'access' or 'refresh'
 * @param decode string with decoded token
 * @returns {boolean} is token is valid
 */
User.methods.verifyToken = function (name, decode) {
    return decode.secret == this.secrets[name];
}

User.virtual('displayedName').get(function () {
    return this.name;
})

User.virtual('info').get(function () {
    return {
        email:this.email,
        id: this._id,
        name: this.displayedName,
        role: this.role,
        created: this.created
    }
})
// create an user model
let UserModel = Mongoose.model('User', User);
module.exports = UserModel;