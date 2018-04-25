module.exports = {
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    testEnvironment: "node",
    "moduleNameMapper": {
        "@config":"<rootDir>/src/server/config/configuration",
        "@utils":"<rootDir>/src/server/utils/index",
        "@errors/(.*)":"<rootDir>/src/server/services/errors/$1",
        "@routes":"<rootDir>/src/server/routes/index",
        "@GraphQL/(.*)":"<rootDir>/src/server/controllers/graphql/$1",
        "@DB/(.*)":"<rootDir>/src/server/DB/$1",
        "@controllers/(.*)":"<rootDir>/src/server/controllers/$1",
    }
};