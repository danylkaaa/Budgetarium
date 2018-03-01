'use strict';
const Mongoose = require('mongoose');
const Utils = require('@utils');
const config = require('@config');

let User = new Mongoose.Schema({
    displayedName:{
      type:String,
      required:true,
    },
    name: {
        type: String,
        required: true,
    },
    email:
        {
            type: String,
            validate: {
                validator: (value) => validator.user.email(value).valid,
                message: "{VALUE} is not a valid email"
            },
        },
    created: {
        type: Date,
        default: Date.now
    },
    facebook: {
        access: String,
        refresh: String,
        id: String,
        picture: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

});
/**
 * add plugin do schema
 */
User.plugin(require('mongoose-paginate'));

/**
 * make new index in database by username
 */
// User.index({email: 1}, {unique: true});

/**
 * Before save a user document, Make sure:
 * 1. Hash user's password
 * 2. Regenerate secrets
 */
User.pre('save', async function (next) {
    // if (!this.isUsedBasicAuth && this.isNew) {
    //     this.password = await Utils.crypto.random(10);
    //     this.email = this.email || Mongoose.Types.ObjectId();
    // }
    // if (this.isModified('password') || this.isNew) {
    //     this.password = await Utils.crypto.hash(this.password, config.security.SERVER_SALT);
    // }
    next();
});

User.pre('remove', async function (doc, next) {
    await PositionDB.remove.byUser(doc.id);
    await CompanyDB.remove.byAdmin(doc.id);
    await InviteDB.remove.byCompany(doc.id);
    next();
});

/**
 * compare, is this user, has such password
 * @param password plain string with string
 * @returns {boolean} is the password used by the user
 */
User.methods.comparePasswords = function (password) {
    return this.isUsedBasicAuth && Utils.crypto.compare(password, this.password, config.security.SERVER_SALT);
};


/**
 * define virtual property, accessToken, generate token
 */
User.virtual('accessToken')
    .get(function () {
        return Utils.tokens.generate('access', this.payloadAccess)
    });

/**
 * define virtual property, refreshToken, generate token
 */
User.virtual('refreshToken')
    .get(function () {
        return Utils.tokens.generate('refresh', this.payloadRefresh)
    });
/**
 * define virtual property, payloadRefresh, contains id of user and his secret
 */
User.virtual('payloadRefresh')
    .get(function () {
        return {
            id: this.id,
            email: this.email
        }
    });
/**
 * define virtual property, payloadAccess, contains id of user and his secret
 */
User.virtual('payloadAccess')
    .get(function () {
        return {
            id: this.id,
            email: this.email
        }
    });
User.virtual('isAdmin')
    .get(function () {
        return this.role == 'admin';
    });
/**
 * define virtual property, credentials, eq. {tokens.access.value, tokens.refresh.value}
 */
User.virtual('credentials')
    .get(function () {
        return {
            access: this.accessToken,
            refresh: this.refreshToken
        }
    });


User.methods.info = function () {
    let info = {
        id: this.id,
        role: this.role,
        name: this.name,
        created: this.created,
        email: this.email,
        picture: this.picture,
        facebook: {
            id: this.facebook.id,
            link: this.facebook.link
        }
    };
    return info;
};

// define an user model
let userModel = Mongoose.model('User', User);
module.exports = userModel;
module.exports=UserModel;