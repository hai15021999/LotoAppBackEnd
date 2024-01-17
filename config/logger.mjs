import dotenv from 'dotenv';
dotenv.config();

const ENABLE_LOGGER_CONSOLE = process.env.ENABLE_LOGGER_CONSOLE;
const ENABLE_LOGGER_FILE    = process.env.ENABLE_LOGGER_FILE;

export {
    ENABLE_LOGGER_CONSOLE,
    ENABLE_LOGGER_FILE
}
