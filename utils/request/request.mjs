// import { Logger } from '../logger/logger.mjs';

const resJSON = (req, res, code, result) => {
    // Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
    res.status(code).json({
        value: result
    });
}

const resSend = (req, res, code, data) => {
    // Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
    res.status(code).send(data);
}

export {
    resJSON,
    resSend
}
