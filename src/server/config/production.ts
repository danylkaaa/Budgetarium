export const isDev: boolean = true;
export const ROOT_URL: string = `http://budgetarium.herokkuapp.com`;
export const DB_URL: string = process.env.DB_ADDRESS_PROD.replace("<dbuser>", process.env.DB_USER_PROD).replace("<dbpassword>", process.env.DB_PSW_PROD);
export const CURRENCY_UPDATE_TIMEOUT = 1000*60*60*24;
export const security: object = {
    TOKEN_SECRET_LENGTH: 10,
    tokenLife: {
        ACCESS: 60*60*1000,
        REFRESH: 60 * 60 * 10000,
    },
    secrets: {
        ACCESS: process.env.TOKEN_ACCESS_SECRET,
        REFRESH: process.env.TOKEN_REFRESH_SECRET,
    },
};