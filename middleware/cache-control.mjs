const DEFAULT_PEROID = 60 * 5; // 5 minutes

const cacheControl = (req, res, next, period = DEFAULT_PEROID) => {
    if (req.method === 'GET')
        res.set('Cache-Control', `public, max-age=${period}`);
    else
        res.set('Cache-Control', `no-store`);

    next();
}

const cacheControlNoStore = (req, res, next) => {
    res.set('Cache-Control', `no-store`);

    next();
}

export {
    cacheControl,
    cacheControlNoStore
}
