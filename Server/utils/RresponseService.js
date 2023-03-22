// General response without a payload
exports.generalResponse = function (err, res, message = "Success", status = 200) {
    if (err !== null) {
        res.status(400).json({
            status: 400,
            msg: message || err.message || "Bad request!",
            error: err
        })
    } else {
        res.status(status).json({
            status: status,
            msg: message
        })
    }
};


// General response with a payload
exports.generalPayloadResponse = function (err, payload, res, message = "Success", status = 200) {
    if (err !== null) {
        res.status(400).json({
            status: 400,
            msg: message || err.message || "Bad request!",
            error: err
        })
    } else {
        res.status(status).json({
            status: status,
            msg: message,
            data: payload,
        })
    }
};