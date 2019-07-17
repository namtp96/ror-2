const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const bookSchema = new Schema({
    id: String,
    language: {
        type: String,
        required: [true, 'missing language']
    },
    country: {
        type: String,
        required:[true, 'missing country']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('languages', bookSchema)
