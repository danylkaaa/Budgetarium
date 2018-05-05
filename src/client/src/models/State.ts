import {IToken, IUser} from "@/models/User";
import {IWallet} from "@/models/Wallet";
import {ITransaction} from "@/models/Transaction";

export interface IState {
    auth: IAuthState;
    app: IAppState;
    apollo?: any;
    form: any;
    wallets: IWalletsState;
    transactions: ITransactionsState;
}

export interface IAuthState {
    readonly accessToken: IToken | null;
    readonly refreshToken: IToken | null;
    user: IUser | null;
}

export interface IError {
    scope: string;
    message: string;
}

export interface IAppState {
    loaders: string[];
    errors: IError[];
    isSidebarOpen: boolean;
}

export interface IWalletsState {
    wallets: IWallet[];
    selectedWallet: IWallet | null;
}

export interface ITransactionsState {
    selectedTransactions: ITransaction[];
    selectedTransaction: ITransaction | null;
}