const config = require('../config/config.js')
const connector = require('../config/gdrive.js')

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config
const { refreshToken } = connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const refresh = async (req, res) => {
    try {
        const token = await refreshToken()

        if (token) {
            return res.status(200).json({
                status: 200,
                message: 'success renew token'
            })
        } else {
            throw new Error('token not found')
        }
    } catch (err) {
        console.err(err.message)
        return res.status(404).json({
            status: 404,
            message: 'Server Failed',
            info: 'token not found'
        })
    }
}

module.exports = refresh