import {IToken, IUser} from "@/models/User";
import ActionTypes, {IActionArgs} from "./actionTypes";


export interface IAuthSuccessAction extends IActionArgs {
    type: ActionTypes.AUTH_SUCCESS;
    accessToken: IToken;
    refreshToken: IToken;
    user: IUser;
}

export interface IAuthLogoutAction extends IActionArgs {
    type: ActionTypes.AUTH_LOGOUT;
}

export interface IAuthUpdateAccessTokenAction extends IActionArgs {
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

export const authUpdateAccessToken = (accessToken: IToken): IAuthUpdateAccessTokenAction => {
    return {
        type: ActionTypes.AUTH_UPDATE_ACCESS_TOKEN,
        accessToken
    };
};

