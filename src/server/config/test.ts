export const isDev: boolean = true;
export const ROOT_URL: string = `localhost:${process.env.PORT}`;
export const DB_URL: string = process.env.DB_ADDRESS_TEST
    .replace("<dbuser>", process.env.DB_USER_TEST)
    .replace("<dbpassword>", process.env.DB_PSW_TEST);

export const security: object = {
    TOKEN_SECRET_LENGTH: 10,
    tokenLife: {
        ACCESS: 1,
        REFRESH: 2,
    },
    secrets: {
        ACCESS: String(Math.random()),
        REFRESH: String(Math.random()),
    },
};