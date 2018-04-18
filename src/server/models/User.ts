import * as mongoose from "mongoose";
import { Logger } from "@utils";
import bcrypt from "bcrypt";
import config from "@config";
import crypto from "crypto";
/**
 * Defines User model
 */
export type UserModel = mongoose.Document & {
    email: string,
    password: string,
    passwordResetToken: string,
    passwordResetExpires: Date,

    facebook: string,
    tokens: AuthToken[],
    profile: {
        name: string,
        gender: string,
        location: string,
        website: string,
        picture: string
    },
    comparePassword: comparePasswordFunction,
    gravatar: (size: number) => string,
};

type comparePasswordFunction = (plainPasswordCandidate: string) => Promise<boolean>;

export type AuthToken = {
    accessToken: string,
    king: string
};

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    facebook: String,
    tokens: Array,
    profile: {
        name: String,
        gender: { type: String, enum: ["male", "female", "none"] },
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });

UserSchema.pre("save", async (next) => {
    const user: UserModel = this;
    if (!user.isModified("password")) { return next(); }

    bcrypt.genSalt(config.get("security.SALT_LENGTH"), (err: any, salt: string) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err: mongoose.Error, hash: string) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = (plainPasswordCandidate: string): Promise<boolean> => {
    return bcrypt.compare(plainPasswordCandidate, this.password);
};

UserSchema.methods.comparePassword = comparePassword;
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

const USER = mongoose.model("User", UserSchema);
export default USER;