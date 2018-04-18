import mongoose from "mongoose";

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

type comparePasswordFunction = (plainPasswordCandidate: string, cb: (err: any, isMatch: any) => {}) => void;

export type AuthToken = {
    accessToken: string,
    king: string
};

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", (next) => {
    const user: mongoose.Document = this;
    if (!user.isModified("password")) { return next(); }
});