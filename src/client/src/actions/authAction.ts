import {IAction} from "./actionTypes";
import {IAuthState, IState} from "@/models/State";
import * as Redux from "redux";
import {ILoginMutationVars, IRegisterMutationVars, LOGIN_MUTATION, REGISTER_MUTATION,REFRESH_ACCESS_TOKEN_MUTATION} from "@/graphql/mutations";
import {addError, endLoading, startLoading} from "@/actions/app";
import {clientAccess, clientRefresh} from "@/graphql";
import {authLogout, authSuccess, authUpdateAccessToken} from "@/actions/auth";

abstract class AuthAction extends IAction<IAuthState> {
    protected authFailAction: AuthFailAction;

    public constructor() {
        super();
        this.authFailAction = new AuthFailAction();
    }
}


const makeAuthRequerst = (apolloClient: any, options: any, dispatch: Redux.Dispatch<any, IState>, name: string, authFailAction: AuthFailAction) => {
    apolloClient.mutate(options)
        .then((response: any) => {
            if (!response.data) {
                throw Error("Server returns empty response");
            } else {
                const {accessToken, refreshToken, me} = response.data[name];
                dispatch(authSuccess(accessToken, refreshToken, me));
            }
        }).catch((err: any) => {
        console.log(JSON.stringify(err, null));
        if (err.graphQLErrors) {
            err.graphQLErrors.forEach((e: any) => dispatch(authFailAction.execute(e.message)));
        } else {
            dispatch(authFailAction.execute(err.message));
        }
    });
};


// get new pair of access and refresh token
export class LoginAction extends AuthAction {
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
export class RegisterAction extends AuthAction {
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
export class LogoutAction extends AuthAction {
    public execute() {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(authLogout());
        };
    }
}

// get new access token from server
export class RefreshAccessTokenAction extends AuthAction {
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
            clientRefresh.mutate({mutation:REFRESH_ACCESS_TOKEN_MUTATION})
                .then((response: any) => {
                    if (!response.data) {
                        throw Error("Server returns empty response");
                    } else {
                        const {token, expiredIn} = response.data.access;
                        console.log(token,expiredIn);
                        console.log(response.data);
                        dispatch(authUpdateAccessToken({token, expiredIn}));
                        dispatch(endLoading("auth"));
                    }
                })
                .catch(err => {
                    console.log(JSON.stringify(err, null));
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
export class AuthFailAction extends IAction<IAuthState> {
    public execute(message: string ) {
        return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
            dispatch(endLoading("auth"));
            console.log(message);
            if (message) {
                dispatch(addError("auth", message));
            } else {
                dispatch(addError("auth", "Some error"));
            }
        };
    }
}