import {AuthMiddleware, Logger, ValidationError, ValidationErrorDescription, Validator} from "@utils";
import UserDB from "@DB/UserDB";
import * as _ from "lodash";
import {GraphQLError} from "graphql";
import {IUser} from "@DB/models/User";
import config from "@config";

interface ISignupMutation {
    name: string;
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

interface IUsersQuery {
    id: string;
    name: string;
}

const logger = Logger(module);


export default {
    Mutation: {
        async signup(__: any, data: ISignupMutation) {
            try {
                const {email, password, name} = data;
                let errors: Array<ValidationErrorDescription> = await Promise.all([Validator.validate("user.email.signup", email), Validator.validate("user.password", password), Validator.validate("user.name", name)]);
                errors = _.compact(errors);
                if (errors.length) throw new ValidationError(errors);
                let user = await UserDB.create({email, password, name});
                return {me: UserDB.getPlainFields(user)};
            } catch (e) {
                logger.error(e);
                throw new GraphQLError(e);
            }
        },
        async login(__: any, data: ILoginMutation) {
            const {email, password} = data;
            const user: any = await UserDB.getByCredentials(email, password);
            if (user) {
                return {me: UserDB.getPlainFields(user)};
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
            return UserDB.getPlainFields(context.user as IUser);
        }),
        async user(__: any, data: IUserQuery) {
            const target: IUser = await UserDB.getFieldsById(data.id,UserDB.plainFields());
            console.log(data,target.id);
            if (target) {
                return target;
            } else {
                throw new GraphQLError("No such user");
            }
        },
        users: (__: any, {id, name}: IUsersQuery) => {
            return UserDB.getFieldsById({id, name: new RegExp(name)}, UserDB.plainFields());
        }
    },
    User: {
        async avatar(data: IUser) {
            try {
                const user = await UserDB.findById(data.id);
                if (user) {
                    return user.avatar(250);
                } else {
                    return null;
                }
            } catch (err) {
                logger.error(err);
                throw new GraphQLError(err);
            }
        },
        async name(data: IUser) {
            try {
                const user = await UserDB.findById(data.id);
                if (user) {
                    return user.name;
                } else {
                    return null;
                }
            } catch (err) {
                logger.error(err);
                throw new GraphQLError(err);
            }
        }
    },
    AuthPayload: {
        async accessToken({me}: { me: IUser }) {
            const currTime = new Date().getTime();
            try {
                const user = await UserDB.findById(me.id);
                return {
                    token: user.generateAccessToken(),
                    expiredIn: currTime + Number(config.get("security.tokenLife.ACCESS")) * 1000
                };
            } catch (e) {
                logger.error(e);
                return new GraphQLError(e);
            }
        },
        async refreshToken({me}: { me: IUser }) {
            const currTime = new Date().getTime();
            try {
                const user = await UserDB.findById(me.id);
                return {
                    token: user.generateRefreshToken(),
                    expiredIn: currTime + Number(config.get("security.tokenLife.REFRESH")) * 1000
                };
            } catch (e) {
                logger.error(e);
                return new GraphQLError(e);
            }
        }
    }
};