import AbstractValidator from "./AbstractValidator";
import UserValidator from "./UserValidator";
import WalletValidator from "./WalletValidator";
import TransactionValidator from "./TransactionValidator";


class RootValidator extends AbstractValidator {
    private static _instance: RootValidator = new RootValidator();

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        super();
        this.setHandler("user",UserValidator);
        this.setHandler("wallet",WalletValidator);
        this.setHandler("transaction",TransactionValidator);
    }
}

export default RootValidator.getInstance();