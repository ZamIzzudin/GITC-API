const { google } = require('googleapis')
const fs = require('fs')

function connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
    )

    try {
        const credential = fs.readFileSync("credential.json")
        const parsed = JSON.parse(credential)

        oauth2Client.setCredentials(parsed)
    } catch {
        console.log('Failed to get credentials')
    }

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    });

    const refreshToken = () => {
        oauth2Client.refreshAccessToken((err, tokens) => {
            if (err) {
                console.error('Failed to renew token', err);
            } else {
                fs.writeFileSync('credential.json', JSON.stringify(tokens))
                oauth2Client.setCredentials(tokens)
                console.log('Success renew token')
            }
        })
    }

    return { oauth2Client, drive, refreshToken }
}

module.exports = connector