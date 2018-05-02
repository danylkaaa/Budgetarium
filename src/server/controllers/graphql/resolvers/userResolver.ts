import {AuthMiddleware, Logger, ValidationError, ValidationErrorDescription, Validator} from "@utils";
import UserDB from "@DB/UserDB";
import * as _ from "lodash";
import {GraphQLError} from "graphql";
import {IUser} from "@DB/models/User";

interface ISignupMutation {
    email: string;
    password: string;
}

interface ILoginMutation {
    email: string;
    password: string;
}

interface IContext {
    user: IUser;
}

interface IUserQuery {
    id: string;
}

const logger = Logger(module);


export default {
    Mutation: {
        async signup(__: any, data: ISignupMutation) {
            logger.debug(JSON.stringify(data));
            const {email, password} = data;
            let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signup", email), Validator.validate("user.password", password)]);
            errors = _.compact(errors);
            if (errors.length) throw new ValidationError(errors);
            let user = await UserDB.create({email, password});
            return {
                ...user.jwt(),
                me: {
                    id: user._id,
                    name: user.profile.name
                }
            };
        },
        async login(__: any, data: ILoginMutation) {
            const {email, password} = data;
            const user: any = await UserDB.getByCredentials(email, password);
            if (user) {
                return {
                    ...user.jwt(),
                    me: {
                        id: user._id,
                        name: user.profile.name
                    }
                };
            } else {
                throw new GraphQLError("Invalid email or password");
            }
        },
        logout: AuthMiddleware(["local", "access"], async (_: any, __: any, context: IContext): Promise<boolean> => {
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
        me: AuthMiddleware(["local", "access"], async (_: any, __: any, context: IContext): Promise<any> => {
            return (context.user as IUser).profile;
        }),

        async user(__: any, {id}: IUserQuery) {
            const target: IUser = await UserDB.findById(id);
            if (target) {
                return target.profile;
            } else {
                return null;
            }
        },
        users: (__: any, {id, name, gender}: { id: string, name: string, gender: string }, context: any) => {

        }
    },
    User: {
        async avatar(data:IUser) {
            try {
                const user = await UserDB.findById(data.id);
                if(user) {
                    return user.avatar(250);
                }else{
                    return null;
                }
            } catch (err) {
                logger.error(err);
                throw new GraphQLError(err);
            }
        }
    }
};