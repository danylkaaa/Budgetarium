import AbstractValidator from "./AbstractValidator";
import * as validator from "validator";
import { ValidationError } from "class-validator";
import { ValidationErrorDescription, Logger } from "@utils";
import * as _ from "lodash";
import UserDB from "@DB/UserDB";
import RootValidator from "./RootValidator";
const logger=Logger(module);
class EmailValidation extends AbstractValidator {
    private static _instance: EmailValidation = new EmailValidation();

    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        logger.debug(value);
        const key = "email";
        if (validator.isEmpty(value)) {
            return { key, message: "Is empty" };
        }
        if (!validator.isEmail(value)) {
            return { key, message: "Is now a valid email" };
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
class PasswordlValidation extends AbstractValidator {
    private static _instance: PasswordlValidation = new PasswordlValidation();
    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        const key = "password";
        const passwordRegex = /^(?=.*\d.*)(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*[!#$%&?]*.*).{8,20}$/;
        if (validator.isEmpty(value)) {
            return { key, message: "Is empty" };
        }
        if (!passwordRegex.test(value)) {
            return { key, message: "Is not a valid password. Please", help: "Password must be minimum 8, and maximum 20 characters at least: 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number" };
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
        this.setHandler("password",PasswordlValidation.getInstance());
        this.setHandler("email",EmailValidation.getInstance());
    }

}



export default UserValidator.getInstance();