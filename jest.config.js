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
        "@controllers/(.*)":"<rootDir>/src/server/controllers/$1",
    }
};