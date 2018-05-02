const mergeResolvers = require("merge-graphql-schemas").mergeResolvers;
const fileLoader = require("merge-graphql-schemas").fileLoader;
const path = require("path");
const resolvers = fileLoader(path.join(__dirname, "./resolvers"), { recursive: true });

export default mergeResolvers(resolvers);