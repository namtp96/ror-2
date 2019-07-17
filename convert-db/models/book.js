const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const bookSchema = new Schema({
    _id: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String
    },
    titleWords: {
        type: [String]
    },
    shortContent: {
        type: String
    },
    shortContentWords: {
        type: [String]
    },
    content: {
        type: String
    },
    excerpt: {
        type: String
    },
    authors: {
        type: [String]
    },
    writers: {
        type: [String]
    },
    categories: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    size: {
        type: Number
    },
    publisher: {
        type: String
    },
    published: {
        type: Date
    },
    pages: {
        type: Number
    },
    language: {
        type: [String]
    },
    formats: {
        type: [String]
    },
    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        require: true,
        default: 'enabled',
    },
    archived: {
        type: Number,
        enum: [0, 1],
        require: true,
        default: 0
    },
})

bookSchema.index({ categories: 1, tags: 1 });

module.exports =  mongoose.model('book', bookSchema)