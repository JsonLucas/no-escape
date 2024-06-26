import "dotenv/config";

export const port = process.env.PORT || 5000;
export const cryptoSecretKey = process.env.CRYPTO_SECRET || "";
export const cryptoIvKey = process.env.CRYPTO_IV_SECRET || "";
export const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM || "AES-256-CBC";