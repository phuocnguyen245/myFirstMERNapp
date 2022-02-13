import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connect from './config/database.js'
import dotenv from 'dotenv'
import homepage from './routers/homepage.js'
const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())
dotenv.config()

// Connect db
connect.connect()

app.use('/', homepage)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})