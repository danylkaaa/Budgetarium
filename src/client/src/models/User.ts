export interface IUserPayload {
    email: string;
    password: string;
}

export interface IToken {
    expiredIn: Date;
    token: string;
}