import * as mongoose from "mongoose";
import { Logger, TokenGenerator, IModel } from "@utils";
import * as  bcrypt from "bcrypt";
import config from "@config";
import * as crypto from "crypto";
const logger = Logger(module);

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
    tokens: AuthToken[],
    profile: {
        name: string,
        picture: string
    },
    comparePassword: comparePasswordFunction,
    generateAccessToken: tokenGeneratorFunction,
    generateRefreshToken: tokenGeneratorFunction,
    regenerateJWTSalts: tokenSaltGenerator,
    gravatar: (size: number) => string,
};
export const UserSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required:true
    } ,
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
}, { timestamps: true });


type comparePasswordFunction = (plainPasswordCandidate: string) => Promise<boolean>;
type tokenGeneratorFunction = () => string;
type tokenSaltGenerator = () => Promise<any>;

export type Payload = {
    id: string;
    salt: string;
}
export type AuthToken = {
    accessToken: string,
    king: string
};
UserSchema.plugin(require("mongoose-paginate"));
UserSchema.pre("save", async function (next) {
    const user: any = this;
    if (!this.isModified("password") && !this.isNew) { return next(); }
    try {

        const salts: Array<string> = await Promise.all([
            bcrypt.genSalt(config.get("security.SALT_LENGTH")),
            bcrypt.genSalt(config.get("security.SALT_LENGTH")),
            bcrypt.genSalt(config.get("security.SALT_LENGTH"))
        ]);
        user.jwtSecrets = {
            access: salts[0],
            refresh: salts[1]
        }
        user.password = await bcrypt.hash(user.password, salts[2]);
    } catch (err) {
        logger.error(err);
        next(err);
    }
});
UserSchema.methods.regenerateJWTSalts = async function (): Promise<any> {
    const salts: Array<string> = await Promise.all([
        bcrypt.genSalt(config.get("security.SALT_LENGTH")),
        bcrypt.genSalt(config.get("security.SALT_LENGTH"))
    ]);
    this.jwtSecrets = {
        access: salts[0],
        refresh: salts[1]
    }
    return this.save();
}
UserSchema.methods.generateAccessToken = function (): string {
    const payload: Payload = {
        id: this._id,
        salt: this.jwtSecrets.access
    };
    return TokenGenerator.generate("access", payload);
};
UserSchema.methods.generateRefreshToken = function (): string {
    const user: IUser = this;
    const payload: Payload = {
        id: this._id,
        salt: this.jwtSecrets.refresh
    };
    return TokenGenerator.generate("refresh", payload);
}
UserSchema.methods.comparePassword = function (plainPasswordCandidate: string): Promise<boolean> {
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