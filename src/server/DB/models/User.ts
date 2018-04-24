import * as mongoose from "mongoose";
import { Logger, TokenGenerator, IModel } from "@utils";
import bcrypt from "bcrypt";
import config from "@config";
import crypto from "crypto";
const logger = Logger(module);
/**
 * Defines User model
 */
export interface IUser extends mongoose.Document {
    email: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: Date,
    jwtSalts: {
        access: string,
        refresh: string
    }
    facebook: string,
    tokens: AuthToken[],
    profile: {
        name: string,
        gender: string,
        picture: string
    },
    comparePassword: comparePasswordFunction,
    accessToken: tokenGeneratorFunction,
    refreshToken: tokenGeneratorFunction,
    gravatar: (size: number) => string,
};

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
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
        gender: { type: String, enum: ["male", "female", "any"] },
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });


type comparePasswordFunction = (plainPasswordCandidate: string) => Promise<boolean>;
type tokenGeneratorFunction = () => string;


export type Payload = {
    id: string;
    salt: string;
}
export type AuthToken = {
    accessToken: string,
    king: string
};
UserSchema.plugin(require("mongoose-paginate"));
UserSchema.pre("save", async (next) => {
    const user: IUser = this;
    if (!user.isModified("password")) { return next(); }
    try {

        const salts: Array<string> = await Promise.all([
            bcrypt.genSalt(config.get("security.SALT_LENGTH")),
            bcrypt.genSalt(config.get("security.SALT_LENGTH")),
            bcrypt.genSalt(config.get("security.SALT_LENGTH"))
        ]);
        user.jwtSalts.access = salts[0];
        user.jwtSalts.refresh = salts[1];
        user.password = await bcrypt.hash(user.password, salts[2]);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

UserSchema.methods.generateAccessToken = (): string => {
    const user: IUser = this;
    const payload: Payload = {
        id: user._id,
        salt: user.jwtSalts.access
    };
    return TokenGenerator.generate("access", payload);
};
UserSchema.methods.generateRefreshToken = (): string => {
    const user: IUser = this;
    const payload: Payload = {
        id: user._id,
        salt: user.jwtSalts.refresh
    };
    return TokenGenerator.generate("refresh", payload);
}
UserSchema.methods.comparePassword = (plainPasswordCandidate: string): Promise<boolean> => {
    return bcrypt.compare(plainPasswordCandidate, this.password);
};

UserSchema.methods.gravatar = (size: number): string => {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    } else {
        const md5: string = crypto.createHash("md5").update(this.email).digest("hex");
        return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
    }
};
export const UserModel: IModel<IUser> = mongoose.model<IUser>("User", UserSchema);