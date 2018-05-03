import AbstractValidator from "./AbstractValidator";
import UserValidator from "./UserValidator";
import WalletValidator from "./WalletValidator";


class RootValidator extends AbstractValidator {
    private static _instance: RootValidator = new RootValidator();

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        super();
        this.setHandler("user",UserValidator);
        this.setHandler("wallet",WalletValidator);
    }
}

export default RootValidator.getInstance();