import AbstractValidator from "./AbstractValidator";


class RootValidator extends AbstractValidator {
    private static _instance: RootValidator = new RootValidator();

    public static getInstance() {
        return this._instance;
    }

    private constructor() {
        super();
    }
}

export default RootValidator.getInstance();