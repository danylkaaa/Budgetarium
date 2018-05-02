import gql from "graphql-tag";

export interface IRegisterResponse {
    accessToken: IToken;
    refreshToken: IToken;
}

export interface IToken {
    token: string;
    expiredIn: number;
}

export const TOKEN = gql`
    type Token{
        token:String
        expiredIn:Float
    }
`;

export const PAYLOAD_TYPE = gql`
    ${TOKEN}
    type Payload{
        accessToken:TOKEN!
        refreshToken:TOKEN!
    }
`;

export const REGISTER_MUTATION = gql`    
    mutation{
        signup(email:$email,password:$password){
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


