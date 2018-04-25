import { ValidationErrorDescription, Logger, Validator, ValidationError } from "@utils";
import UserDB from "@DB/UserDB";
const logger = Logger(module);
import * as _ from "lodash";
import { GraphQLError } from "graphql";

export default {
    Mutation: {
        signup: async (__: any, { email, password }: { email: string, password: string }) => {
            logger.debug(JSON.stringify({ email, password }));
            let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signup", email), Validator.validate("user.password", password)]);
            errors = _.compact(errors);

            if (errors.length) throw new ValidationError(errors);
            let user = await UserDB.create({ email, password });
            return {
                accessToken: user.generateAccessToken(),
                refreshToken: user.generateRefreshToken()
            };
        },
        signin: async (__: any, { email, password }: { email: string, password: string }, context: any) => {
            try{
            let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signin", email), Validator.validate("user.password", password)]);
            errors = _.compact(errors);
            if (errors.length) throw new ValidationError(errors);
            const user: any = await UserDB.getByCredentials(email, password);     
            if (user) {
                return {
                    accessToken: user.generateAccessToken(),
                    refreshToken: user.generateRefreshToken()
                }
            } else {
                throw new GraphQLError("Invalid email or password");
            }
        }catch(err){
            logger.error(err);
        }
        }
    },
    Query: {
        me: () => {
            return {

            }
        },
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