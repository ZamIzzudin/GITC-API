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
        oauth2Client.setCredentials(JSON.parse(credential))
    } catch (error) {
        console.log(error.message)
        console.log('Failed to get credentials')
    }

    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    });

    return { oauth2Client, drive }
}

module.exports = connector