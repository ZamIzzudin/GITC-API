const Increment = require('../models/increment')

const getLatestNumber = async () => {
    try {
        const latestNumber = await Increment.findOne({ _id: '6558c49a249bc64208262fb4' })

        if (!latestNumber) {
            throw new Error('Latest Number Not Found')
        } else {
            return latestNumber
        }

    } catch (err) {
        console.error(err.message)
        return err.message
    }
}

const updateLatestNumber = async (type = "other", newNumber) => {
    try {
        let newIncrement = {}

        if (type === "confirm") {
            newIncrement = {
                cl_latest_number: newNumber
            }
        } else if (type === 'offer') {
            newIncrement = {
                ol_latest_number: newNumber
            }
        }

        const updatedNumber = await Increment.updateOne({ _id: '6558c49a249bc64208262fb4' }, newIncrement)


        if (!updatedNumber.modifiedCount) {
            throw new Error('Failed Update Latest')
        }

    } catch (err) {
        console.error(err.message)
        return err
    }
}

module.exports = { getLatestNumber, updateLatestNumber }