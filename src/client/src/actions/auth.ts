import {IToken, IUser, IUserPayload} from "@/models/User";
import ActionTypes, {IAction} from "./actionTypes";
import {IState} from "@/models/State";
import * as Redux from "redux";
import {endLoading, startLoading} from "@/actions/loading";
import apolloClient from "@/graphql";
import {REGISTER_MUTATION} from "@/graphql/mutations/auth";
import {FetchResult} from "react-apollo";

export interface IAuthSuccessAction extends IAction {
    type: ActionTypes.AUTH_SUCCESS;
    accessToken: IToken;
    refreshToken: IToken;
    user: IUser;
}

export interface IAuthFailAction extends IAction {
    type: ActionTypes.AUTH_FAIL;
    error: any;
}

export interface IAuthLogoutAction extends IAction {
    type: ActionTypes.AUTH_LOGOUT;
}

export interface IAuthUpdateAccessTokenAction extends IAction {
    type: ActionTypes.AUTH_UPDATE_ACCESS_TOKEN;
    accessToken: IToken;
}

export const authSuccess = (accessToken: IToken, refreshToken: IToken, user: IUser): IAuthSuccessAction => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        accessToken,
        refreshToken,
        user
    };
};

export const authLogout = (): IAuthLogoutAction => {
    return {
        type: ActionTypes.AUTH_LOGOUT
    };
};

export const updateAccessToken = (accessToken: IToken): IAuthUpdateAccessTokenAction => {
    return {
        type: ActionTypes.AUTH_UPDATE_ACCESS_TOKEN,
        accessToken
    };
};

export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: Redux.Dispatch<any, IState>) => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

const USER: IUser = {
    name: "USERNAME",
    id: "USER_ID"
};

export const register = (payload: IUserPayload) => {
    return (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(startLoading("auth"));
        apolloClient.mutate({
            mutation: REGISTER_MUTATION,
            variables: {email: payload.email, password: payload.password}
        })
            .then((result: FetchResult) => {

                dispatch(authSuccess({token: "access", expiredIn: 1000}, {token: "refresh", expiredIn: 1000}, USER));
                dispatch(checkAuthTimeout(1000));
            })
            .catch((err: any) => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};


export const authCheckAccessToken = () => {
    return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => {
        const {accessToken} = getState().auth;
        if (accessToken == null) {
            return dispatch(authLogout());
        }
        const expirationDate = new Date(accessToken.expiredIn);
        if (expirationDate <= new Date()) {
            return dispatch(authCheckRefreshToken());
        }
        return null;
    };
};

export const authCheckRefreshToken = () => {
    return (dispatch: Redux.Dispatch<any, IState>, getState: () => IState): any => {
        const {refreshToken} = getState().auth;
        if (refreshToken == null) {
            return dispatch(authLogout());
        }
        const expirationDate = new Date(refreshToken.expiredIn);
        if (expirationDate <= new Date()) {
            return dispatch(authLogout());
        } else {
            return dispatch(authReloadAccessToken());
        }
    };
};

export const authCheckState = () => {
    return (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(authCheckAccessToken());
    };
};

export const authReloadAccessToken = () => {
    return (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(updateAccessToken({token: "newAccessToken", expiredIn: 1000}));
    };
};


export const authFail = (error: any) => {
    return (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(endLoading("auth"));
    };
};
