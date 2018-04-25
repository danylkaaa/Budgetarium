import { ValidationErrorDescription, Logger, Validator, ValidationError } from "@utils";
import UserDB from "@DB/UserDB";
const logger = Logger(module);
import * as _ from "lodash";

export default {
    Mutation: {
        signup: async (__: any, { email, password }: { email: string, password: string }, context: any) => {
            logger.debug(JSON.stringify({ email, password }));
            let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signup", email), Validator.validate("user.password", password)]);
            errors = _.compact(errors);

            if (errors.length) throw new ValidationError(errors);
            let user = await UserDB.create({ email, password });
            return {
                accessToken: user.generateAccessToken(),
                refreshToken: user.generateRefreshToken()
            };

        }
    },
    Query: {
        user: () => {
            return {
                id: "asmlamlamsla",
                gender: "male"
            }
        },
        users: () => {
            return [
                {
                    id: "asmlamlamsla",
                    gender: "male"
                }
            ]
        }
    }
}