export default  `
"""
 A type that describes user.
"""
type User implements Paginable{
    " The user's unique id."
    id:ID!
    " The user's real name."
    name:String
    " The user's avatar."
    avatar:String
}

type Query{
    " Get info about current account."
    me:User
    " Get info about users by query."
    users:Pagination    
    " Get info about user by id."
    user(id:ID!):User    
}
`;