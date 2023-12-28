const fs = require('fs');

const connector = require('../config/gdrive.js')
const { update } = require('../controllers/credential')
const config = require('../config/config.js')

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config

const auth = async (req, res) => {
    const { oauth2Client: oauth } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    const url = oauth.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/drive'
        ]
    })
    res.redirect(url)
}

const redirect = async (req, res) => {
    const { oauth2Client: oauth } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

    const { code } = req.query
    const { tokens } = await oauth.getToken(code)
    oauth.setCredentials(tokens)
    update(tokens)
    res.redirect('/')
}

const driveList = async (req, res) => {
    const { drive } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { id_folder } = req.params

    let query = {}

    if (id_folder) {
        query = {
            q: `'${id_folder}' in parents`,
        }
    }

    const response = await drive.files.list(query)
    res.send(response.data.files)
}

const upload = async (req, res) => {
    const { drive } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { id_folder } = req.params

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            status: 400,
            message: 'failed',
            info: 'No File Found'
        })
    }

    try {
        const file = req.files.file

        // temp file convert
        const tempFilePath = `temp_${file.name}`
        fs.writeFileSync(tempFilePath, file.data)

        const fileMetadata = {
            name: file.name,
            parents: [id_folder],
        };

        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(tempFilePath),
        };

        const uploadedFile = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        })

        // remove temp
        fs.unlinkSync(tempFilePath)

        res.status(200).json({
            status: 200,
            message: 'Success upload file to ID: ' + uploadedFile.data.id
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'Server Failed'
        })
    }
}

const webView = async (req, res) => {
    const { drive } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { id_file } = req.params
    permission = {
        'type': 'anyone',
        'role': 'reader',
    }

    try {
        drive.permissions.create({
            fileId: id_file,
            requestBody: permission,
        })

        const file = await drive.files.get({ fileId: id_file, fields: 'webViewLink', })
        const fileUrl = file.data.webViewLink;
        res.json({
            url: fileUrl
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('Terjadi kesalahan saat membuka file.')
    }
}

const download = async (req, res) => {
    const { drive } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { id_file } = req.params;

    try {
        const meta = await drive.files.get({ fileId: id_file, fields: 'name', })
        const file = await drive.files.get({ fileId: id_file, alt: 'media', fields: 'name' }, { responseType: 'stream' })

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${meta.data.name}`)

        file.data
            .on('error', (err) => {
                console.error(err)
                res.status(500).json({
                    status: 500,
                    message: 'failed',
                    info: err
                });
            })
            .pipe(res)
    } catch (error) {
        console.error(error)
        res.status(404).json({
            status: 404,
            message: 'failed',
            info: 'Server error'
        })
    }
}

const remove = async (req, res) => {
    const { drive } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { id_file } = req.params

    try {
        await drive.files.delete({ fileId: id_file });
        res.status(200).json({
            status: 200,
            message: 'Success delete file'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: 500,
            message: 'failed',
            info: 'Success delete file'
        })
    }
}

module.exports = { auth, redirect, driveList, upload, webView, download, remove }