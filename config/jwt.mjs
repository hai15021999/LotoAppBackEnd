import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET          = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;
const JWT_ALGORITHM       = process.env.JWT_ALGORITHM;

export {
    JWT_SECRET,
    JWT_EXPIRATION_TIME,
    JWT_ALGORITHM
}
