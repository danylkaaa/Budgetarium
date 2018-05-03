import AbstractValidator from "./AbstractValidator";
import * as validator from "validator";
import {Logger, ValidationErrorDescription} from "@utils";
import CurrencyValidator from "./CurrencyValidator";
import WalletDB from "@DB/WalletDB";

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
        if (!validator.isLength(value, {min: 2, max: 40})) {
            return {key, message: "The name must contains [2,40] symbols"};
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

class CategoryValidator extends AbstractValidator {
    private static _instance: CategoryValidator = new CategoryValidator();

    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        const key = "category";
        if (!value) {
            return null;
        }
        if (!validator.isLength(value, {min: 2, max: 20})) {
            return {key, message: `The ${key} must contains [2,20] symbols`};
        }
        if (!validator.matches(value, /^[\w\-\. ]+$/)) {
            return {key, message: `The ${key} must contains only digits, characters or '- _ .'`};
        }
        return null;
    }

    private constructor() {
        super();
    }
}

class WalletContainerValidation extends AbstractValidator {
    private static _instance: WalletContainerValidation = new WalletContainerValidation();

    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        const key = "wallet";
        if (!value) {
            return {key, message: "Is empty"};
        }
        if (!await WalletDB.contains({_id: value})) {
            return {key, message: "There are no wallet with this id"};
        }
        return null;
    }

    private constructor() {
        super();
    }
}

class TransactionValidator extends AbstractValidator {
    private static _instance: TransactionValidator = new TransactionValidator();

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        super();
        this.setHandler("currency", CurrencyValidator);
        this.setHandler("name", NameValidation.getInstance());
        this.setHandler("wallet", WalletContainerValidation.getInstance());
        this.setHandler("category", CategoryValidator.getInstance());
    }

}


export default TransactionValidator.getInstance();