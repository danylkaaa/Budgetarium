import bcrypt from "bcrypt";

/**
 * get hash of string
 * @param plainData  data to hashing
 * @param salt salt for hashing
 * @returns Promise<string>
 */
export function hash(plainData: string, salt: string): Promise<string> {
    return bcrypt.hash(plainData, salt);
}

/**
 * Compare two strings, plain and hashed
 * @param plainData plain string to compare
 * @param hashedData hashed string
 * @returns Promise<boolean> result of comparing
 */
export function compare(plainData: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(plainData, hashedData);
}
/**
 * Generate random string with specified length
 * @param length length of result
 * @returns Promise<string> random string
 */
export function random(length: number): Promise<string> {
    return bcrypt.genSalt(length);
}