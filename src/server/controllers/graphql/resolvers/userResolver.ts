import { ValidationErrorDescription, Logger, Validator, ValidationError, AuthMiddleware } from "@utils";
import UserDB from "@DB/UserDB";
const logger = Logger(module);
import * as _ from "lodash";
import { GraphQLError } from "graphql";
import { userInfo } from "os";
import { IUser } from "@DB/models/User";

export default {
    Mutation: {
        async signup(__: any, { credentials: { email, password } }: { credentials: { email: string, password: string }}) {
            let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signup", email), Validator.validate("user.password", password)]);
            errors = _.compact(errors);

            if (errors.length) throw new ValidationError(errors);
            let user = await UserDB.create({ email, password });
            return {
                accessToken: user.generateAccessToken(),
                refreshToken: user.generateRefreshToken()
            };
        },
        async login(__: any, { credentials: { email, password } }: { credentials: { email: string, password: string }}, context: any) {
            let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.login", email), Validator.validate("user.password", password)]);
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
        },
        logout: AuthMiddleware(["local", "access"], async (_: any, __: any, context: any): Promise<boolean> => {
            try {
                await (context.user as IUser).regenerateJWTSalts();
                return true;
            } catch (err) {
                logger.error(err);
                return false;
            }
        })
    },
    Query: {
        me: AuthMiddleware(["local", "access"], async (_: any, __: any, context: any): Promise<any> => {
            return (context.user as IUser).profile;
        }),
        async user(__: any, { id }: { id: string }, context: any) {
            const target: IUser = await UserDB.findById(id);
            if (target) {
                return target.profile;
            } else {
                return null;
            }
        },
        users: (__: any, { id, name, gender }: { id: string, name: string, gender: string }, context: any) => {

        }
    }
}