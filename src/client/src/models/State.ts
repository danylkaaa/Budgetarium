import {IToken, IUser} from "@/models/User";
import {IWallet} from "@/models/Wallet";

export interface IState {
    auth: IAuthState;
    app: IAppState;
    apollo?: any;
    form: any;
    wallets:IWalletsState;
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

export interface IWalletsState {
    wallets:IWallet[];
    selectedWallet:IWallet|null;
}