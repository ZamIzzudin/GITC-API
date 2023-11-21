const config = require('../config/config.js')
const connector = require('../config/gdrive.js')

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config
const { refreshToken } = connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

async function refresh(req, res) {
    await refreshToken()

    return res.json({
        status: 'triggered'
    })
}

module.exports = refresh