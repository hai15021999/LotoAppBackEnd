import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRATION_TIME } from '../../config/jwt.mjs';

const generateAccessToken = req => {
    try {
        const token = jwt.sign({ user: req.body.user ?? {} }, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRATION_TIME });
        return `Bearer ${token}`;
    } catch (error) {
        return error;
    }
}

const verifyAccessToken = async req => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.replace('Bearer ', '');
        const payload = jwt.verify(token, JWT_SECRET, { algorithm: JWT_ALGORITHM });
        const expireIn = DateTime.fromMillis(payload.exp * 1000);
        const today = DateTime.now();
        const result = {
            valid: true,
            payload: payload
        }
        if (today > expireIn) {
            result.valid = false;
        }
        return result;
    } catch (error) {
        return error;
    }
}

const decryptAccessToken = async accessToken => {
    try {
        const token = accessToken.replace('Bearer ', '');
        const payload = jwt.verify(token, JWT_SECRET, { algorithm: JWT_ALGORITHM });
        return payload;
    } catch (error) {
        return error;
    }
}

export {
    generateAccessToken,
    verifyAccessToken,
    decryptAccessToken
}
