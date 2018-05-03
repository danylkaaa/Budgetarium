import {IToken, IUser} from "@/models/User";
import ActionTypes, {IAction} from "./actionTypes";
import {IState} from "@/models/State";
import * as Redux from "redux";
import {endLoading, startLoading} from "@/actions/app";
import apolloClient from "@/graphql";
import {ILoginMutationVars, IRegisterMutationVars, LOGIN_MUTATION, REGISTER_MUTATION} from "@/graphql/mutations";

export interface IAuthSuccessAction extends IAction {
    type: ActionTypes.AUTH_SUCCESS;
    accessToken: IToken;
    refreshToken: IToken;
    user: IUser;
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
        }, expirationTime);
    };
};

export const login = (payload: ILoginMutationVars) => {
    return async (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(startLoading("auth"));
        const variables: ILoginMutationVars = {...payload};
        console.log(variables);
        const mutation = LOGIN_MUTATION;
        try {
            const response: any = await apolloClient.mutate({mutation, variables});
            if (!response.data) {
                throw Error("Server returns empty response");
            } else {
                const {accessToken, refreshToken, me} = response.data.signup;
                dispatch(authSuccess(accessToken, refreshToken, me));
                dispatch(checkAuthTimeout(response.data.accessToken.expiredIn - new Date().getTime()));
            }
        } catch (err) {
            dispatch(authFail(err));
        }
    };
};

export const register = (payload: IRegisterMutationVars) => {
    return async (dispatch: Redux.Dispatch<any, IState>) => {
        dispatch(startLoading("auth"));
        const variables: IRegisterMutationVars = {...payload};
        console.log(variables);
        const mutation = REGISTER_MUTATION;
        try {
            const response: any = await apolloClient.mutate({mutation, variables});
            if (!response.data) {
                throw Error("Server returns empty response");
            } else {
                const {accessToken, refreshToken, me} = response.data.signup;
                dispatch(authSuccess(accessToken, refreshToken, me));
                dispatch(checkAuthTimeout(response.data.accessToken.expiredIn - new Date().getTime()));
            }
        } catch (err) {
            dispatch(authFail(err));
        }
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
        console.log(JSON.stringify(error, null));
        dispatch(endLoading("auth"));
    };
};
