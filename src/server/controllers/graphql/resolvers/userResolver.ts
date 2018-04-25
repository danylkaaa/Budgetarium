import { ValidationErrorDescription, Logger, Validator, ValidationError } from "@utils";
import UserDB from "@DB/UserDB";
const logger = Logger(module);

export default {
    Mutation: {
        signup: async (_: any, { email, password }: { email: string, password: string }, context: any) => {
            logger.debug(JSON.stringify({ email, password }));
            const errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signup", email), Validator.validate("user.password", password)]);
            if (errors.length) throw new ValidationError(errors);
            let user = await UserDB.create({ email, password });
            return { ...user.profile };

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