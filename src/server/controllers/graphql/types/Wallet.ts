export default  `
"""
 A type that describes user's wallet.
"""
type Wallet implements Paginable{
    " The wallet's unique id."
    id:ID!
    " The wallet's name."
    name:String!
    " The wallet's owner's id."
    owner:User!
    " The wallet's currency." 
    currency:String!
    " The wallet's current total."
    total:Float!
    " The wallet's sum of gains."
    gain:Float!
    " The wallet's sum of spendings."
    spending:Float!
    " All wallet's transactions." 
    transactions:[Transaction]!
    " List of users, who have access to wallet"
    sharedWith:[User]!
}

type Query{
    " Get info about wallet by it's id."
    wallet(id:ID!):Wallet
    " Get info about wallets by it's properties."
    wallets(id:[ID], name:String,currency:String):[Wallet]!    
}

type Mutation{
    " Create new wallet."
    createWallet(name:String!, currency:String):Wallet
    " Delete wallet by it's ID."
    deleteWallet(id:ID!):Boolean
}
`;