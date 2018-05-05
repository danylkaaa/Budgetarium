import gql from "graphql-tag";


export interface ITransactionCreateMutationResponse {
    name: string;
    id: string;
    value: number;
    created: Date;
    currency: string;
    category: string;
    wallet: {
        id: string
    };
}

export interface ITransactionCreateMutationVars {
    name: string;
    currency: string;
    value: number;
    wallet: string;
    category: string;
}

export interface ITransactionGetQueryVars {
    id?: string;
}

export interface ITransactionsGetQueryVars {
    walletId?: string;
}

export interface ITransactionDeleteMutationVars {
    id: string;
}

export const TRANSACTION_CREATE_MUTATION = gql`
    mutation CreateTransaction($name:String!, $currency:String, $category:String, $value:Float!,$wallet:ID!){
        createTransaction(name:$name, currency:$currency, category:$category, value:$value,wallet:$wallet){
            id
            name
            currency
            value
            created
            wallet{
                id
            }
        }
    }
`;


export const TRANSACTION_DELETE_MUTATION = gql`
    mutation deleteTransaction($id:ID!){
        deleteTransaction(id:$id)
    }
`;

export const TRANSACTION_GET_QUERY = gql`
    query  GetTransaction($id:ID!){
        transaction(id:$id)
    }
`;

export const TRANSACTIONS_GET_QUERY = gql`
    query GetTransactions($walletId:String){
        transactions(walletId:$walletId){
            id
            name
            currency
            value
            created
            wallet{
                id
            }
        }
    }
`;