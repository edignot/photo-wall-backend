import mongoose from 'mongoose'

export const photoSchema = mongoose.Schema({
    note: {
        type: String,
        required: false,
    },
    photoUrl: {
        type: String,
        required: true,
    },
})

export const Photo = mongoose.model('Photo', photoSchema)
