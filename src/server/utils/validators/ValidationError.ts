import { GraphQLError } from 'graphql';

export default class ValidationError extends GraphQLError {
    public readonly state: { [key: string]: Array<string> };
    constructor(errors: Array<ValidationErrorDescription>) {
        super('The request is invalid.');
        this.state = errors.reduce((result: any, error) => {
            if (Object.prototype.hasOwnProperty.call(result, error.key)) {
                result[error.key].push(error.message);
            } else {
                result[error.key] = [error.message];
            }
            return result;
        }, {});
    }
}


export interface ValidationErrorDescription {
    key: string,
    message: string,
}