import {IToken, IUserPayload} from "@/models/User";
import ActionTypes, {IAction} from "./actionTypes";
import {IState} from "@/models/State";
import * as Redux from "redux";

export interface IAuthRedirectPathAction extends IAction {
    type: ActionTypes.SET_AUTH_REDIRECT_PATH;
    path: string;
}

export const setAuthRedirectPath = (path: string): IAuthRedirectPathAction => {
    return {
        type: ActionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};


export interface IAuthSuccessAction extends IAction {
    type: ActionTypes.AUTH_SUCCESS;
    accessToken: IToken;
    refreshToken: IToken;
    userId: string;
}

export interface IAuthFailAction extends IAction {
    type: ActionTypes.AUTH_FAIL;
    error: any;
}

export interface IAuthStartAction extends IAction {
    type: ActionTypes.AUTH_START;
}

export interface IAuthLogoutAction extends IAction {
    type: ActionTypes.AUTH_LOGOUT;
}

export interface IAuthUpdateAccessTokenAction extends IAction {
    type: ActionTypes.AUTH_UPDATE_ACCESS_TOKEN;
    accessToken: IToken;
}

export const authStart = (): IAuthStartAction => {
    return {
        type: ActionTypes.AUTH_START
    };
};

export const authSuccess = (accessToken: IToken, refreshToken: IToken, userId: string): IAuthSuccessAction => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        accessToken,
        refreshToken,
        userId
    };
};

export const AuthFail = (error: any): IAuthFailAction => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error
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

export const auth = (payload: IUserPayload) => {
    return (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(authStart());
        dispatch(authSuccess({token: "access", expiredIn: 1000}, {token: "refresh", expiredIn: 1000}, "id123"));
        dispatch(checkAuthTimeout(1000));
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