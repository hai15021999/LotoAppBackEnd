import dotenv from 'dotenv';
dotenv.config();

let dbName = '';
switch (process.env.NODE_ENV) {
    case 'dev': 
        dbName = `${process.env.DOMAIN}_dev`;
        break;
    case 'prod': 
        dbName = `${process.env.DOMAIN}_prod`;
        break;
    default: 
        dbName = `${process.env.DOMAIN}_dev`;
        break;
}

const ENABLE_MONGO         = process.env.ENABLE_MONGO;
const MONGO_URI            = process.env.MONGO_URI;
const MONGO_CLIENT_OPTIONS = {
    useUnifiedTopology: true
}
const MONGO_DBNAME = dbName;

export {
    ENABLE_MONGO,
    MONGO_URI,
    MONGO_CLIENT_OPTIONS,
    MONGO_DBNAME
}
