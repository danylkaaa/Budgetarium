import {IUserPayload} from "@/models/User";

export enum ActionTypes {
    LOGIN = "[auth] LOGIN",
    LOGOUT = "[auth] LOGOUT",
    REGISTER = "[auth] REGISTER"
}

export interface ILoginAction {
    type: ActionTypes.LOGIN;
    payload: IUserPayload;
}

export interface IRegisterAction {
    type: ActionTypes.REGISTER;
    payload: IUserPayload;
}

export function registerStart(payload: IUserPayload): IRegisterAction {
    return {type: ActionTypes.REGISTER, payload};
}

export function loginStart(payload: IUserPayload): ILoginAction {
    return {type: ActionTypes.LOGIN, payload};
}