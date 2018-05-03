export const isDev: boolean = true;
export const ROOT_URL: string = `localhost:${process.env.PORT}`;
export const DB_URL: string = process.env.DB_ADDRESS_DEV.replace("<dbuser>", process.env.DB_USER_DEV).replace("<dbpassword>", process.env.DB_PSW_DEV);
export const CURRENCY_UPDATE_TIMEOUT = 1000*60;
export const security: object = {
    TOKEN_SECRET_LENGTH: 10,
    tokenLife: {
        ACCESS: 60 * 60,
        REFRESH: 60 * 60 * 24,
    },
    secrets: {
        ACCESS: process.env.TOKEN_ACCESS_SECRET,
        REFRESH: process.env.TOKEN_REFRESH_SECRET,
    },
};