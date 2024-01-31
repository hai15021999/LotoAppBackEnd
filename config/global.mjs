import dotenv from 'dotenv';
dotenv.config();

const VERSION     = '1.0.3';
const NODE_ENV    = 'dev';
const API_VERSION = 'v1';
const HOSTNAME    = '10.1.1.4';
// const HOSTNAME    = 'localhost';
const HTTP_PORT   = 8080;

export {
    VERSION,
    NODE_ENV,
    API_VERSION,
    HOSTNAME,
    HTTP_PORT
}
