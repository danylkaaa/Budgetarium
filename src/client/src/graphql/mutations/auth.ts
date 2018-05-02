import gql from "graphql-tag";
import {IUserShema} from "@/graphql/schemas/user";


export interface IToken {
    token: string;
    expiredIn: number;
}

export interface IRegisterMutationResponse {
    me: IUserShema;
    accessToken: IToken;
    refreshToken: IToken;
}

export interface ILoginMutationResponse  {
    me: IUserShema;
    accessToken: IToken;
    refreshToken: IToken;
}

export interface IRegisterMutationVars {
    name:string;
    email: string;
    password: string;
}

export interface ILoginArgs {
    email: string;
    password: string;
}

export const REGISTER_MUTATION = gql`
    mutation{
        signup(email:$email,password:$password,name:$name){
            accessToken{
                token
                expiredIn
            }
            refreshToken{
                token
                expiredIn
            }
        }
    }
`;


export const LOGIN_MUTATION = gql`
    mutation{
        signin(email:$email,password:$password){
            accessToken{
                token
                expiredIn
            }
            refreshToken{
                token
                expiredIn
            }
        }
    }
`;
