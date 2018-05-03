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

export interface ILoginMutationResponse {
    me: IUserShema;
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

export const REGISTER_MUTATION = gql`
    mutation signup($email:String!, $password:String!,$name:String!){
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
`;


export const LOGIN_MUTATION = gql`
    mutation login($email:String!,$password:String!){
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
`;
