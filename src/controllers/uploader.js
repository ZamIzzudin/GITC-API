const Offer = require('../models/offers')
const Confirm = require('../models/confirms')

const { getLatestNumber, updateLatestNumber } = require('./increment.js')

const connector = require('../config/gdrive.js')
const config = require('../config/config.js')
const fs = require('fs');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config
const { drive } = connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

const driveMap = {
    offer: {
        2023: '1464WA78O6yQPgtXsBVEqUkqghxIn69X3',
        2024: '1pc8dsq-Teeplvsu_zF_cPmcvppX9PFfo',
        2025: '1oNWUqZKskaZaoeR34M7ZSA83IY7ehar-',
        2026: '1jX4P6VP715bi2K1Rj1pTg_w4chwolKoP',
    },
    confirm: {
        2023: '12t3dTnaSBG_zXBI0QpHCbBymJ2j60TKZ',
        2024: '1Hw859_o9h_QA8PyFw0k4d_8v-7x2DDUX',
        2025: '1NPDcyCpflUv78BOWpApJDkzBnVfZtY3W',
        2026: '1NIvCTM4LJeRSx7D8XyynlpLv1dwQucL_',
    },
    other: '1y6moMmyuagvR_speQVQVZ80nCz0lUusx'
}

const handleOther = async () => {
    try {
        const latest = await getLatestNumber()
        await updateLatestNumber(latest.latest_number + 1)
    } catch (err) {
        console.error(err.message)
    }
}

const handletter = async (type, id_letter, id_drive) => {
    try {
        const payload = {
            status: 'done',
            drive_id: id_drive
        }

        if (type === 'confirm') {
            const doneConfirm = await Confirm.updateOne({ _id: id_letter }, payload)

            if (!doneConfirm.modifiedCount) {
                throw new Error('Failed to Update status')
            }
        } else if (type === 'offer') {
            const doneConfirm = await Offer.updateOne({ _id: id_letter }, payload)

            if (!doneConfirm.modifiedCount) {
                throw new Error('Failed to Update status')
            }
        } else {
            throw new Error('Not Found Type')
        }
    } catch (err) {
        console.error(err.message)
    }
}

const upload = async (req, res) => {
    const { id_letter } = req.params
    const { type, year } = req.body

    const id_folder = type === 'other' ? driveMap[type] : driveMap[type][year] // Get Folder Number

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

        // Update Increment
        if (type === 'other') {
            await handleOther()
        } else {
            await handletter(type, id_letter, uploadedFile.data.id)
        }

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

module.exports = { upload }