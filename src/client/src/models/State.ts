import {IToken} from "@/models/User";
import {IUser} from "@/graphql/types/User";

export interface IState {
    auth: IAuthState;
}

export interface IAuthState {
    readonly accessToken: IToken | null;
    readonly refreshToken: IToken | null;
    loading: boolean;
    authRedirectPath: string;
    user:IUser|null;
    error:any;
}