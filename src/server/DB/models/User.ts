import * as mongoose from "mongoose";
import {IModel, Logger, TokenGenerator} from "@utils";
import * as  bcrypt from "bcrypt";
import * as crypto from "crypto";
import config from "@config";

const logger = Logger(module);

/**
 * TYPES
 */
type comparePasswordFunction = (plainPasswordCandidate: string) => Promise<boolean>;
type tokenGeneratorFunction = () => string;
type tokenSaltGenerator = () => Promise<any>;
type jwtGenerator = () => { accessToken: IToken, refreshToken: IToken };
type avatarGenerator = (avatarSize: number) => string;

/**
 * INTERFACES
 */
export interface IToken {
    token: string;
    expiredIn: number;
}

export interface IPayload {
    id: string;
    salt: string;
}

export interface IAuthToken {
    accessToken: string;
    king: string;
}

export interface IJWTPayload {
    accessToken: IToken;
    refreshToken: IToken;
}


/**
 * Defines User model
 */
export type IUser = mongoose.Document & {
    email: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: Date,
    jwtSalts: {
        access: string,
        refresh: string
    }
    facebook: string,
    tokens: IAuthToken[],
    profile: {
        name: string,
        picture: string
    },
    comparePassword: comparePasswordFunction,
    generateAccessToken: tokenGeneratorFunction,
    generateRefreshToken: tokenGeneratorFunction,
    regenerateJWTSalts: tokenSaltGenerator,
    jwt: jwtGenerator,
    avatar: avatarGenerator,
    gravatar: avatarGenerator,
};
export const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    jwtSecrets: {
        access: String,
        refresh: String
    },
    facebook: String,
    tokens: Array,
    profile: {
        name: String,
        picture: String
    }
}, {timestamps: true});


UserSchema.plugin(require("mongoose-paginate"));
UserSchema.pre("save", async function (next) {
    const user: any = this;
    if (!this.isModified("password") && !this.isNew) {
        return next();
    }
    try {

        const salts: Array<string> = await Promise.all([
            bcrypt.genSalt(config.get("security.SALT_LENGTH")),
            bcrypt.genSalt(config.get("security.SALT_LENGTH")),
            bcrypt.genSalt(config.get("security.SALT_LENGTH"))
        ]);
        user.jwtSecrets = {
            access: salts[0],
            refresh: salts[1]
        };
        user.password = await bcrypt.hash(user.password, salts[2]);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

/**
 * METHODS
 */

UserSchema.methods.regenerateJWTSalts = async function (): Promise<any> {
    const salts: Array<string> = await Promise.all([
        bcrypt.genSalt(config.get("security.SALT_LENGTH")),
        bcrypt.genSalt(config.get("security.SALT_LENGTH"))
    ]);
    this.jwtSecrets = {
        access: salts[0],
        refresh: salts[1]
    };
    return this.save();
};
UserSchema.methods.generateAccessToken = function (): string {
    const payload: IPayload = {
        id: this._id,
        salt: this.jwtSecrets.access
    };
    return TokenGenerator.generate("access", payload);
};
UserSchema.methods.generateRefreshToken = function (): string {
    const user: IUser = this;
    const payload: IPayload = {
        id: this._id,
        salt: this.jwtSecrets.refresh
    };
    return TokenGenerator.generate("refresh", payload);
};
UserSchema.methods.comparePassword = function (plainPasswordCandidate: string): Promise<boolean> {
    return bcrypt.compare(plainPasswordCandidate, this.password);
};
UserSchema.methods.jwt = function (): IJWTPayload {
    const currTime = new Date().getTime();
    return {
        accessToken: {
            token: this.generateAccessToken(),
            expiredIn: currTime + Number(config.get("security.tokenLife.ACCESS")) * 1000
        },
        refreshToken: {
            token: this.generateRefreshToken(),
            expiredIn: currTime + Number(config.get("security.tokenLife.REFRESH")) * 1000
        }
    };
};
UserSchema.methods.avatar = function (): string {
    if (this.profile.avatar) {
        return this.profile.avatar;
    } else {
        return this.gravatar(250);
    }
}
UserSchema.methods.gravatar = function(avatarSize: number = 250): string {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${avatarSize}&d=retro`;
    } else {
        const md5: string = crypto.createHash("md5").update(this.email).digest("hex");
        return `https://gravatar.com/avatar/${md5}?s=${avatarSize}&d=retro`;
    }
};
export const UserModel: IModel<IUser> = mongoose.model<IUser>("User", UserSchema);