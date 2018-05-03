import AbstractValidator from "./AbstractValidator";
import * as validator from "validator";
import {Logger, ValidationErrorDescription} from "@utils";
import CurrencyValidator from "./CurrencyValidator";

const logger = Logger(module);

class NameValidation extends AbstractValidator {
    private static _instance: NameValidation = new NameValidation();

    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        const key = "name";
        if (!value) {
            return {key, message: "Is empty"};
        }
        if (!validator.isLength(value, {min: 3, max: 20})) {
            return {key, message: "The name must contains [3,20] symbols"};
        }
        if (!validator.matches(value, /^[\w\-\. ]+$/)) {
            return {key, message: "The name must contain only digits, characters or '- _ .'"};
        }
        return null;
    }

    private constructor() {
        super();
    }
}

class WalletValidator extends AbstractValidator {
    private static _instance: WalletValidator = new WalletValidator();

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        super();
        this.setHandler("currency", CurrencyValidator);
        this.setHandler("name", NameValidation.getInstance());
    }

}


export default WalletValidator.getInstance();