import {IToken} from "@/models/User";

export interface IState {
    auth: IAuthState;
}

export interface IAuthState {
    readonly accessToken: IToken|null;
    readonly refreshToken: IToken|null;
}