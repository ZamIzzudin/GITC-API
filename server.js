const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const fileUpload = require('express-fileupload')

const routes = require('./src/routes/index')

const dbConnection = require('./src/config/db.js')
const config = require('./src/config/config.js')
const path = require('path')

// setup configuration
const { PORT, MONGO_URL } = config

const app = express()

//middleware
app.use('/public', express.static(path.join(__dirname, '/public')))

//enable cors 
app.use(cors({
    credentials: true,
    origin: ['https://dms-vze-garuda.netlify.app', 'http://localhost:5173']
}))

app.use(helmet());

//allow to access cookie
app.use(cookieParser());

//allow request with format x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//allow request with format json
app.use(bodyParser.json())

//file uploader handler
app.use(fileUpload({
    uploadTimeout: 60000
}))

//route render
app.use(routes)

//success flagging
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
dbConnection(MONGO_URL)