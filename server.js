const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const routes = require('./src/routes/index')

const dbConnection = require('./src/config/db.js')
const config = require('./src/config/config.js')
const path = require('path')

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// setup configuration
const { PORT, MONGO_URL } = config

const app = express()

//middleware
app.use('/public', express.static(path.join(__dirname, '/public')))

//enable cors 
app.use(cors({
    credentials: true,
    origin: []
}))

app.use(helmet());

//allow to access cookie
app.use(cookieParser());

//allow request with format x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//allow request with format json
app.use(bodyParser.json())

// // route render
app.use(routes)

// success flagging
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
dbConnection(MONGO_URL)
