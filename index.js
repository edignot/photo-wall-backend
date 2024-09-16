import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Photo } from './models/photoModel.js'

dotenv.config()

const { DATABASE_URL, PORT } = process.env

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    return res.status(200).send('Home')
})

app.get('/photos', async (request, response) => {
    try {
        const photos = await Photo.find({})

        return response.status(200).json(photos)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

app.get('/photos/:id', async (request, response) => {
    const { id } = request.params

    try {
        const photo = await Photo.findById(id)

        if (!photo) {
            return response.status(404).json({ message: 'Photo not found' })
        }

        return response.status(200).json(photos)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

app.put('/photos/:id', async (request, response) => {
    const { id } = request.params
    const { body } = request.body

    try {
        const photo = await Photo.findByIdAndUpdate(id, body, { new: true })

        if (!photo) {
            return response.status(404).json({ message: 'Photo not found' })
        }

        return response.status(200).json(photo)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

app.post('/photos', async (request, response) => {
    try {
        if (!request.body.photoUrl) {
            return response.status(400).send({
                message: 'Photo is required',
            })
        }

        const newPhoto = {
            photoUrl: request.body.photoUrl,
            note: request.body.note,
        }

        const photo = await Photo.create(newPhoto)

        return response.status(201).send(photo)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

app.delete('/photos/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Photo.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: 'Photo not found' })
        }

        return response
            .status(200)
            .send({ message: 'Photo successfully deleted' })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
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
