const path = require("path");
const mergeGraphqlSchemas = require("merge-graphql-schemas");
const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeTypes = mergeGraphqlSchemas.mergeTypes

const typesArray = fileLoader(path.join(__dirname, "./types"), { recursive: true });
export default mergeTypes(typesArray, { all: true })