import { GraphQLError } from 'graphql';


export default class ValidationError extends GraphQLError {
    public readonly status: number;
    public readonly state: { [key: string]: Array<string> };
    constructor(errors: Array<ValidationErrorDescription>, status: number = 400) {
        super('The request is invalid.');
        this.status = status;
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
    [field: string]: string
}