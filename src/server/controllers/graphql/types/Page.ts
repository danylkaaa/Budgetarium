export default `
interface Paginable{
    id:ID!
}

"""
A type that describes paginated search result
"""
type  Pagination{
    " Total count of documents"
    total:Int!
    " Number of documents per page"
    limit:Int!,
    " Nuber of documents, that was skipped"
    offset:Int!,
    " List of documnets"
    results:[Paginable!]!
}
`;