const mongoose = require('mongoose')

const user_scheme = new mongoose.Schema({
    username: String,
    display_name: String,
    password: String,
    role: {
        type: String,
        enum: ['Sysadmin', 'Admin', 'Guest'],
        default: 'Guest'
    },
    profile_picture: {
        public_id: {
            type: String,
            default: "none"
        },
        url: {
            type: String,
            default: "none"
        },
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model("User", user_scheme)

module.exports = User