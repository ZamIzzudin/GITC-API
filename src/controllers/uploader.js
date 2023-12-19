const Offer = require('../models/offers')
const Confirm = require('../models/confirms')
const Report = require('../models/reports')
// const product = require('../libs/product.json')

// const { getLatestNumber, updateLatestNumber } = require('./increment.js')

const connector = require('../config/gdrive.js')
const config = require('../config/config.js')
const fs = require('fs');
const path = require("path");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config

const driveMap = {
    offer: {
        2020: '1uRmnLmH22d2oU0oEl2PJfmmPsLRYGbkA',
        2021: '11pqL5AK9jArrAAtyP05l9F2r2r8wYJ4-',
        2022: '1LgwhPEF_OB3_tTN_spl8O2uc7YMdkAYX',
        2023: '1464WA78O6yQPgtXsBVEqUkqghxIn69X3',
        2024: '1pc8dsq-Teeplvsu_zF_cPmcvppX9PFfo',
        2025: '1oNWUqZKskaZaoeR34M7ZSA83IY7ehar-',
        2026: '1jX4P6VP715bi2K1Rj1pTg_w4chwolKoP',
    },
    confirm: {
        2020: '1cn2Paf9Sebk_5QVAauccpV_2EfG7PsE9',
        2021: '18OLnc4cPvXyUWi-aU2i1bZJXhXXJn57r',
        2022: '1u_9jwnxDyEG5687b8Kbc-8wOnpvZo4YH',
        2023: '12t3dTnaSBG_zXBI0QpHCbBymJ2j60TKZ',
        2024: '1Hw859_o9h_QA8PyFw0k4d_8v-7x2DDUX',
        2025: '1NPDcyCpflUv78BOWpApJDkzBnVfZtY3W',
        2026: '1NIvCTM4LJeRSx7D8XyynlpLv1dwQucL_',
    },
    other: '1y6moMmyuagvR_speQVQVZ80nCz0lUusx'
}

const handleOther = async (metadata, filePath) => {
    try {
        const payload = {
            ...metadata,
            drive_id: filePath
        }

        if (metadata.type === 'confirm') {
            await Offer.create(payload)
        } else if (metadata.type === 'offer') {
            await Confirm.create(payload)
        }
    } catch (err) {
        console.error(err.message)
    }
}

const handleReport = async (data) => {
    const { category, sub_category, produk } = data

    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    const report_setup = produk.map(item => {
        return {
            category,
            sub_category,
            tahun: item.tanggal_kegiatan.split('-')[0],
            bulan: months[item.tanggal_kegiatan.split('-')[1]],
            unit: item.jumlah_peserta,
            revanue: item.total_biaya_kegiatan
        }
    })

    report_setup.forEach(async item => {
        const report = await Report.findOne({ tahun: item.tahun, bulan: { '$regex': item.bulan, '$options': 'i' } })

        if (report !== null) {
            const updated_revanue = report.total_revanue += item.revanue
            const updated_unit = report.total_unit += parseInt(item.unit)
            let updated_detail = [...report.detail]

            const is_exist = updated_detail.findIndex(detail => detail.category === item.category)

            if (is_exist >= 0) {
                updated_detail[is_exist] = {
                    ...updated_detail[is_exist],
                    unit: parseInt(updated_detail[is_exist].unit) + parseInt(item.unit),
                    revanue: updated_detail[is_exist].revanue += item.revanue
                }
            } else {
                updated_detail.push({
                    category: item.category,
                    sub_category: item.sub_category,
                    percentage: 100,
                    unit: parseInt(item.unit),
                    revanue: item.revanue
                })
            }

            // Setup Percentage
            const fixed_detail = updated_detail.map(detail => {
                return {
                    category: detail.category,
                    sub_category: detail.sub_category,
                    percentage: Math.round(detail.unit / updated_unit * 100),
                    unit: detail.unit,
                    revanue: detail.revanue
                }
            })

            const payload = {
                total_revanue: updated_revanue,
                total_unit: updated_unit,
                detail: fixed_detail
            }

            await Report.updateOne({ tahun: item.tahun, bulan: { '$regex': item.bulan, '$options': 'i' } }, payload)

        } else {
            const payload = {
                tahun: item.tahun,
                bulan: item.bulan,
                total_revanue: item.revanue,
                total_unit: item.unit,
                detail: [
                    {
                        category: item.category,
                        sub_category: item.sub_category,
                        percentage: 100,
                        unit: item.unit,
                        revanue: item.revanue
                    }
                ]
            }

            await Report.create(payload)
        }
    })
}

const handleLetter = async (type, id_letter, id_drive) => {
    try {
        const payload = {
            status: 'done',
            drive_id: id_drive
        }

        if (type === 'confirm') {
            const doneConfirm = await Confirm.updateOne({ _id: id_letter }, payload)
            const detailConfirm = await Confirm.findOne({ _id: id_letter })

            handleReport(detailConfirm)
            if (!doneConfirm.modifiedCount) {
                throw new Error('Failed to Update status')
            }


        } else if (type === 'offer') {
            const doneOffer = await Offer.updateOne({ _id: id_letter }, payload)

            if (!doneOffer.modifiedCount) {
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
    const { drive } = await connector(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { type, year, id_letter = null, metadata = {} } = req.body

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
        const tempFilePath = path.join(__dirname + file.name)
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

        if (type === 'other' && !id_letter) {
            // Update Increment
            await handleOther(metadata, uploadedFile.data.id)
        } else {
            // Update Status
            await handleLetter(type, id_letter, uploadedFile.data.id)
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