// import { Logger } from '../utils/logger/logger.mjs';
import { MongoCollection } from '../utils/mongodb/mongodb.mjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_ALGORITHM } from '../config/jwt.mjs';
import { DateTime } from 'luxon';

const UserCollection = MongoCollection('user');

const jwtChecker = async (req, res, next) => {
    try {
        const headers = req.headers;
        const authorization = headers.authorization;
        const token = authorization && authorization.replace('Bearer ', '');
        if (token) {
            const payload = jwt.verify(token, JWT_SECRET, { algorithm: JWT_ALGORITHM });
            const phoneNumber = payload.phoneNumber;
            const expireIn = DateTime.fromMillis(payload.exp * 1000);
            const user = await UserCollection.findOne({ phoneNumber: phoneNumber });
            const today = DateTime.now();
            if (today > expireIn) {
                // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
                res.status(401).json(new Error('Expired Token'));
            }
            if (user.phoneNumber.toString() !== phoneNumber) {
                // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
                res.status(401).json(new Error('Invalid Token'));
            }
            next();
        } else {
            // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
            res.status(401).json(new Error('Empty Token'));
        }
    } catch (error) {
        // Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
        res.status(401).json(error);
    }
}

export { jwtChecker }
