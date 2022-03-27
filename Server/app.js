import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connect from './config/database.js'
import routes from './routers/index.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(cookieParser('MY SECRET'));
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
const corsOptions = {
    origin: true,
    credentials: true
};
app.use(cors(corsOptions))
dotenv.config()


// Connect db
connect.connect()

app.use('/', routes)
app.get('/setcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
});
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})