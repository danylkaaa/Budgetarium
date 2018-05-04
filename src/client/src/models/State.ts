import {IToken, IUser} from "@/models/User";

export interface IState {
    auth: IAuthState;
    app: IAppState;
    apollo?: any;
    form: any;
}

export interface IAuthState {
    readonly accessToken: IToken | null;
    readonly refreshToken: IToken | null;
    user: IUser | null;
}

export interface IError {
    scope:string;
    message:string;
}
export interface IAppState {
    loaders: string[];
    errors:IError[];
    isSidebarOpen:boolean;
}