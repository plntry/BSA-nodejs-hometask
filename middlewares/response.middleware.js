const responseMiddleware = (req, res, next) => {
    // DONE
    // TODO: Implement middleware that returns result of the query
    if (res.badRequest) {
        res.status(400).json({ error: true, message: res.message });
    }

    if (res.notFound) {
        res.status(404).json({ error: true, message: res.message });
    }

    res.status(200).json(res.data); 
    next();
}

exports.responseMiddleware = responseMiddleware;