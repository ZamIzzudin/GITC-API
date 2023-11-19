const { verify_access_token } = require('../libs/jwt')

const guest = (req, res, next) => {
    let access_token = req.headers.authorization
    if (!access_token) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'no detected token'
        });
    }

    try {
        access_token = access_token.split(' ')[1];
        verify_access_token(access_token, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'expired token'
                });
            } else if (decoded.role.toLowerCase() !== 'Guest') {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'access denied'
                });
            }
            req.token = decoded
            next()
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'server error'
        });
    }
}

const admin = (req, res, next) => {
    let access_token = req.headers.authorization
    if (!access_token) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'no detected token'
        });
    }

    try {
        access_token = access_token.split(' ')[1];
        verify_access_token(access_token, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'expired token'
                });
            } else if (decoded.role.toLowerCase() !== 'Admin') {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'access denied'
                });
            }
            req.token = decoded
            next()
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'server error'
        });
    }
}

const admins = (req, res, next) => {
    let access_token = req.headers.authorization
    if (!access_token) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'no detected token'
        });
    }

    try {
        access_token = access_token.split(' ')[1];
        verify_access_token(access_token, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'expired token'
                });
            } else if (decoded.role.toLowerCase() !== 'Admin' || decoded.role.toLowerCase() !== 'Sysadmin') {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'access denied'
                });
            }
            req.token = decoded
            next()
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'server error'
        });
    }
}

const sysadmin = (req, res, next) => {
    let access_token = req.headers.authorization
    if (!access_token) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'no detected token'
        });
    }

    try {
        access_token = access_token.split(' ')[1];

        verify_access_token(access_token, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'expired token'
                });
            } else if (decoded.role.toLowerCase() !== 'Sysadmin') {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'access denied'
                });
            }
            req.token = decoded
            next()
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'server error'
        })
    }
}

const pic = (req, res, next) => {
    let access_token = req.headers.authorization
    if (!access_token) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'no detected token'
        });
    }

    try {
        access_token = access_token.split(' ')[1];

        verify_access_token(access_token, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'expired token'
                });
            } else if (decoded.role.toLowerCase() !== 'PIC') {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'access denied'
                });
            }
            req.token = decoded
            next()
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'server error'
        })
    }
}

const islogin = (req, res, next) => {
    let access_token = req.headers.authorization
    if (!access_token) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'no detected token'
        });
    }

    try {
        access_token = access_token.split(' ')[1];

        verify_access_token(access_token, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'expired token'
                });
            }

            req.token = decoded
            next()
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'server error'
        })
    }
}

module.exports = { sysadmin, admin, admins, guest, pic, islogin }