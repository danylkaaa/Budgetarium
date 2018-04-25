import AbstractValidator from "./AbstractValidator";
import UserValidator from "./UserValidator";


class RootValidator extends AbstractValidator {
    private static _instance: RootValidator = new RootValidator();

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        super();
        this.setHandler("user", UserValidator);
    }
}

export default RootValidator.getInstance();