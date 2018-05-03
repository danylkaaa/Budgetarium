export default `
"""
 A type that describes user's transaction.
"""
type Transaction implements Paginable{
    " The transaction's unique id."
    id:ID!
    " The transaction's name."
    name:String!
    " The transaction's wallet's id."
    walletId:ID!
    " The transaction's value."
    value:Float!
    " The transaction's category name."
    category:Float!
    " The transaction's creator."
    creator:ID!
}

type Query{
    " Get info about transaction by it's id."
    transaction(id:ID!):Transaction
    " Get info about transaction by wallet's id."
    transactions(walletID:ID!):[Transaction]!    
}

type Mutation{
    " Create new transaction."
    createTransaction(name:String!, currency:String, value: Float, category:String,wallet:ID!):Transaction
    " Delete transaction by it's ID."
    deleteTransaction(id:ID!):Boolean
    " Update transaction by id."
    updateTransaction(id:ID!,name:String!, currency:String, value: Float, category:String,wallet:ID!):Transaction
}
`;