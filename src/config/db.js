const mongoose = require('mongoose')

function dbConnection(MONGO_URL) {
    // database (mongo) connection
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(MONGO_URL)
        console.log('connected to db')
    } catch (error) {
        console.log(error.message)
    };
}

module.exports = dbConnection