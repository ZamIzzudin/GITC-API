const config = require('../config/config.js')
const connector = require('../config/gdrive.js')

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config

const vercelRefresh = async (req, res) => {
    try {
        const { refreshToken } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

        const token = await refreshToken()

        if (token) {
            return res.send({
                status: 200,
                message: 'success renew token'
            })
        } else {
            throw new Error('token not found')
        }
    } catch (err) {
        console.error(err.message)
        return res.send({
            status: 404,
            message: 'Server Failed',
            info: 'token not found'
        })
    }
}

const cronRefresh = async () => {
    const { refreshToken } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    await refreshToken()
}

module.exports = { vercelRefresh, cronRefresh }