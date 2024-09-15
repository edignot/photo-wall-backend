import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { DATABASE_URL, PORT } = process.env

const app = express()

app.get('/', (req, res) => {
    return res.status(200).send('Home')
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
