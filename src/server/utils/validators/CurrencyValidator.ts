import * as validator from "validator";
import {ValidationErrorDescription} from "@utils";
import AbstractValidator from "./AbstractValidator";
import config from "@config";

class CurrencyValidator extends AbstractValidator {
    private static _instance: CurrencyValidator = new CurrencyValidator();

    public static getInstance() {
        return this._instance;
    }

    public async validateByPath(path: string[], value: any): Promise<ValidationErrorDescription> {
        const key = "currency";
        const allowedCurrencies: string[] = config.get("ALLOWED_CURRENCIES");
        if (value && allowedCurrencies.indexOf(value) < 0) {
            return {key, message: "Cannot recognize currency name"};
        }
        return null;
    }

    private constructor() {
        super();
    }

}

export default CurrencyValidator.getInstance();