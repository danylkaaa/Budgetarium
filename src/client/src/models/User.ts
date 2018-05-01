export interface IUserPayload {
    email: string;
    password: string;
}

export interface IToken {
    expiredIn: number;
    token: string;
}

export interface IUser {
    name:string;
    id:string;
}