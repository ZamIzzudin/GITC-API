const { google } = require('googleapis')
const { get, update } = require('../controllers/credential')

async function connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) {
    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
    )

    try {
        await get().then((credential) => {
            console.log('Success to get credentials')
            oauth2Client.setCredentials(credential)
        })
    } catch {
        console.log('Failed to get credentials')
        connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    }

    const drive = await google.drive({
        version: 'v3',
        auth: oauth2Client
    });

    const refreshToken = async () => {
        await oauth2Client.refreshAccessToken((err, tokens) => {
            if (err) {
                console.error('Failed to renew token', err);
            } else {
                update(tokens)
                oauth2Client.setCredentials(tokens)
                return 'ok'
            }
        })
    }

    return { oauth2Client, drive, refreshToken }
}

// const connector = (async (CLIENT_ID, CLIENT_SECRET, REDIRECT_URI) => {
//     const oauth2Client = new google.auth.OAuth2(
//         CLIENT_ID,
//         CLIENT_SECRET,
//         REDIRECT_URI,
//     )

//     try {
//         await get().then((credential) => {
//             console.log('Success to get credentials')
//             oauth2Client.setCredentials(credential)
//         })
//     } catch {
//         console.log('Failed to get credentials')
//         connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
//     }

//     const drive = google.drive({
//         version: 'v3',
//         auth: oauth2Client
//     });

//     const refreshToken = async () => {
//         await oauth2Client.refreshAccessToken((err, tokens) => {
//             if (err) {
//                 console.error('Failed to renew token', err);
//             } else {
//                 update(tokens)
//                 oauth2Client.setCredentials(tokens)
//                 return 'ok'
//             }
//         })
//     }

//     return { oauth2Client, drive, refreshToken }

// })()

module.exports = connector