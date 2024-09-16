import express from 'express'
import { Photo } from '../models/photoModel.js'

const router = express.Router()

router.get('/', async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1
        const limit = parseInt(request.query.limit) || 100

        const photos = await Photo.find()
            .skip((page - 1) * limit)
            .limit(limit)

        const totalPages = Math.ceil((await Photo.countDocuments()) / limit)

        return response
            .status(200)
            .json({ photos, currentPage: page, totalPages })
    } catch (error) {
        console.log(error.message)
        response
            .status(500)
            .send({ message: 'Error getting photo', error: error.message })
    }
})

router.get('/:id', async (request, response) => {
    const { id } = request.params

    try {
        const photo = await Photo.findById(id)

        if (!photo) {
            return response.status(404).json({ message: 'Photo not found' })
        }

        return response.status(200).json(photos)
    } catch (error) {
        console.log(error.message)
        response
            .status(500)
            .send({ message: 'Error getting photo', error: error.message })
    }
})

router.post('/', async (request, response) => {
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
        response
            .status(500)
            .send({ message: 'Error creating photo', error: error.message })
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Photo.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({ message: 'Photo not found' })
        } else {
            return response
                .status(200)
                .json({ message: 'Photo successfully updated' })
        }
    } catch (error) {
        console.log(error.message)
        response
            .status(500)
            .send({ message: 'Error updating photo', error: error.message })
    }
})

router.delete('/:id', async (request, response) => {
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
        response
            .status(500)
            .send({ message: 'Error deleting photo', error: error.message })
    }
})

export default router
