import AbstractValidator from "./AbstractValidator";
import validator from "validator";
import { ValidationError } from "class-validator";
import { ValidationErrorDescription } from "@utils";
import _ from "lodash";
import UserDB from "@DB/UserDB";

class EmailValidation extends AbstractValidator {
    private static _instance: EmailValidation = new EmailValidation();

    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        const key = "email";
        if (validator.isEmpty(value)) {
            return { key, message: "Is empty" };
        }
        if (!validator.isEmail(value)) {
            return { key, message: "Is empty" };
        }
        if (_.last(path) === "signup" && ! await UserDB.isUnused({ email: value })) {
            return { key, message: "This email is already taken" };
        }
        return null;
    }
    private constructor() {
        super();
    }

}

class UserValidator extends AbstractValidator {
    private static _instance: UserValidator = new UserValidator();

    public static getInstance() {
        return this._instance;
    }


    private constructor() {
        super();
        this.setHandler("email", EmailValidation.getInstance());
    }

}

export default UserValidator.getInstance();