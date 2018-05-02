import {IToken, IUser} from "@/models/User";

export interface IState {
    auth: IAuthState;
    loading:ILoadingState;
    apollo?:any;
}
export interface IAuthState {
    readonly accessToken: IToken | null;
    readonly refreshToken: IToken | null;
    user: IUser | null;
}
export interface ILoadingState {
    scopes: string[];
}