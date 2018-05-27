import gql from "graphql-tag";
import {IUser} from "@/models/User";


export interface IToken {
    token: string;
    expiredIn: number;
}

export interface IRegisterMutationResponse {
    me: IUser;
    accessToken: IToken;
    refreshToken: IToken;
}

export interface ILoginMutationResponse {
    me: IUser;
    accessToken: IToken;
    refreshToken: IToken;
}

export interface IRegisterMutationVars {
    name: string;
    email: string;
    password: string;
}

export interface ILoginMutationVars {
    email: string;
    password: string;
}

export const REGISTER_MUTATION = gql(`
    mutation Signup($email:String!, $password:String!,$name:String!){
        signup(email:$email,password:$password,name:$name){
            me{
                id
                name
                avatar
            }
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
`);


export const LOGIN_MUTATION = gql(`
    mutation Login($email:String!,$password:String!){
        login(email:$email,password:$password){
            me{
                id
                name
                avatar
            }
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
`);

export const LOGOUT_MUTATION = gql(`
    mutation Logout{
        logout
    }
`);

export const REFRESH_ACCESS_TOKEN_MUTATION=gql(`
    mutation Access{
        access{
            token
            expiredIn
        }
    }
`);