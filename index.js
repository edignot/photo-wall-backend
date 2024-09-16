import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import photoRoute from './routes/photoRoute.js'

dotenv.config()

const { DATABASE_URL, PORT } = process.env

const app = express()

app.use(express.json())

app.use(cors())

app.use('/photos', photoRoute)

app.get('/', (request, response) => {
    return res.status(200).send('Photos API')
})

mongoose
    .connect(DATABASE_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`photo server is running on port : ${PORT}`)
        })
        console.log('database connected')
    })
    .catch((error) => {
        console.log(error)
    })
