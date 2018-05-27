import {IAction} from "./actionTypes";
import {IAuthState, IState} from "@/models/State";
import * as Redux from "redux";
import {
    ILoginMutationVars,
    IRegisterMutationVars,
    LOGIN_MUTATION,
    REFRESH_ACCESS_TOKEN_MUTATION,
    REGISTER_MUTATION
} from "@/graphql/mutations";
import {addError, endLoading, startLoading} from "@/actions/appArgs";
import {clientAccess, clientRefresh} from "@/graphql";
import {authLogout, authSuccess, authUpdateAccessToken} from "@/actions/authArgs";

abstract class AuthCommand extends IAction<IAuthState> {
    protected authFailAction: AuthFailCommand;

    public constructor() {
        super();
        this.authFailAction = new AuthFailCommand();
    }
}


const makeAuthRequerst = (apolloClient: any, options: any, dispatch: Redux.Dispatch<any, IState>, name: string, authFailAction: AuthFailCommand) => {
    apolloClient.mutate(options)
        .then((response: any) => {
            if (!response.data) {
                throw Error("Server returns empty response");
            } else {
                dispatch(endLoading("auth"));
                apolloClient.cache.reset();
                const {accessToken, refreshToken, me} = response.data[name];
                dispatch(authSuccess(accessToken, refreshToken, me));
            }
        }).catch((err: any) => {
        if (err.graphQLErrors) {
            err.graphQLErrors.forEach((e: any) => dispatch(authFailAction.execute(e.message)));
        } else {
            dispatch(authFailAction.execute(err.message));
        }
    });
};


// get new pair of access and refresh token
export class LoginCommand extends AuthCommand {
    public execute(args: ILoginMutationVars) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(startLoading("auth"));
            const variables: ILoginMutationVars = {...args};
            const mutation = LOGIN_MUTATION;
            makeAuthRequerst(clientAccess, {mutation, variables}, dispatch, "login", this.authFailAction);
        };
    }
}

// register new user and get new pair of access and refresh token
export class RegisterCommand extends AuthCommand {
    public execute(args: IRegisterMutationVars) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(startLoading("auth"));
            const variables: IRegisterMutationVars = {...args};
            const mutation = REGISTER_MUTATION;
            makeAuthRequerst(clientAccess, {mutation, variables}, dispatch, "signup", this.authFailAction);
        };
    }
}

// remove tokens from storage
export class LogoutCommand extends AuthCommand {
    public execute() {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(authLogout());
        };
    }
}

// get new access token from server
export class RefreshAccessTokenCommand extends AuthCommand {
    public execute() {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState): any => {
            // get current refresh token
            const {refreshToken} = getState().auth;
            if (!refreshToken) {
                return dispatch(authLogout());
            }
            // check time of current refresh token
            if (new Date(refreshToken.expiredIn) <= new Date) {
                return dispatch(authLogout());
            }
            // load new access token
            dispatch(startLoading("auth"));
            clientRefresh.mutate({mutation: REFRESH_ACCESS_TOKEN_MUTATION})
                .then((response: any) => {
                    if (!response.data) {
                        throw Error("Server returns empty response");
                    } else {
                        clientAccess.cache.reset();
                        const {token, expiredIn} = response.data.access;
                        dispatch(authUpdateAccessToken({token, expiredIn}));
                        dispatch(endLoading("auth"));
                    }
                })
                .catch(err => {
                    if (err.graphQLErrors) {
                        err.graphQLErrors.forEach((e: any) => this.authFailAction.execute(e.message));
                    } else {
                        dispatch(this.authFailAction.execute(err.message));
                    }
                });
        };
    }
}

// end fetching data end show error message
export class AuthFailCommand extends IAction<IAuthState> {
    public execute(message: string) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(endLoading("auth"));
            if (message) {
                dispatch(addError("auth", message));
            } else {
                dispatch(addError("auth", "Some error"));
            }
        };
    }
}