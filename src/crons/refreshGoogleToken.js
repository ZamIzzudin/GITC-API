const config = require('../config/config.js')
const connector = require('../config/gdrive.js')

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config

module.exports = async (req, res) => {
    try {
        const { refreshToken } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

        const token = refreshToken()

        if (token) {
            return res.status(200).send({
                status: 200,
                message: 'success renew token'
            })
        } else {
            throw new Error('token not found')
        }
    } catch (err) {
        console.error(err.message)
        return res.status(404).send({
            status: 404,
            message: 'Server Failed',
            info: 'token not found'
        })
    }
}