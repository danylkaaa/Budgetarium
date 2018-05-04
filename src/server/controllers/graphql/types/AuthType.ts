export default `
type Token {
    token:String!
    expiredIn:Float!
}

"""
A type that describes object with JWT tokens 
"""
type AuthPayload{
    me:User!
    accessToken:Token!
    refreshToken:Token!
}


type Mutation{
    " Get new access JWT token"
    access:Token!
    " Signup in this service"
    signup(email:String!,password:String!, name:String!):AuthPayload
    " Exit from all openned sessions"
    logout:Boolean
    " Enter to existed account using email and password"
    login( email:String!, password:String!):AuthPayload
}
`;