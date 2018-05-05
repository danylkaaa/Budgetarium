import gql from "graphql-tag";

export interface IWalletCreateMutationResponse {
    name: string;
    id: string;
    total: number;
    gain: number;
    spending: number;
    currency: string;
    owner: {
        id: string
    };
}

export interface IWalletCreateMutationVars {
    name: string;
    currency: string;
}

export interface IWalletGetQueryVars {
    id?: string;
}

export interface IWalletsGetQueryVars {
    id?: [string];
    name?: string;
    currency?: string;
}

export interface IWalletDeleteMutationVars {
    id: string;
}

export const WALLET_CREATE_MUTATION = gql`
    mutation CreateWallet($name:String!, $currency:String){
        createWallet(name:$name, currency:$currency){
            id
            name
            currency
            total
            gain
            spending
            owner{
                id
            }
        }
    }
`;


export const WALLET_DELETE_MUTATION = gql`
    mutation deleteWallet($id:ID!){
        deleteWallet(id:$id)
    }
`;

export const WALLET_GET_QUERY = gql`
    query  GetWallet($id:ID!){
        wallet(id:$id){
            id
            name
            created
            currency
            gain
            spending
            total
            owner{
                id
                name
            }
            transactions{
                id
                name
                category
                value
                created
            }
        }
    }
`;

export const WALLETS_GET_QUERY = gql`
    query GetWallets($name:String){
        wallets(name:$name){
            id
            name
            created
            currency
            gain
            spending
            total
            owner{
                id
                name
            }
        }
    }
`;