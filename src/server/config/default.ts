export const queries: object = {
    PAGINATION_LIMIT: 20,
};
export const security: object = {
    SALT_LENGTH: 10,
    TOKEN_GENERATOR_ALGORITHM:"HS256",
};
export const CURRENCY_UPDATE_TIMEOUT=1000*60*60;
export const CURRENCY_CONVERTATION_BASE="UAH";

export const ALLOWED_CURRENCIES= [
    "BRL",
    "USD",// US Dollar
    "EUR", // Euro
    "CRC", // Costa Rican Colón
    "GBP", // British Pound Sterling
    "ILS", // Israeli New Sheqel
    "INR", // Indian Rupee
    "JPY", // Japanese Yen
    "KRW", // South Korean Won
    "NGN", // Nigerian Naira
    "PHP", // Philippine Peso
    "PLN", // Polish Zloty
    "PYG", // Paraguayan Guarani
    "THB", // Thai Baht
    "UAH", // Ukrainian Hryvnia
    "VND", // Vietnamese Dong
    "RUB", // Russia
    "MXN", // Mexica
];