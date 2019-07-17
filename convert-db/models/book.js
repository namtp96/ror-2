const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const bookSchema = new Schema({
    id: {
        type: String,
        require: true,
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
    size:{
        type:Number
    },
    biIsbn:{
        type:String
    },
    biFileUrl:{
        type:String,
        require:true
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
        default: 0, 
    },
    bookStatus:{
        type:String,
        enum:['activated','unactivated'],
        require:true,
        default:'activated'
    },
    source:{
        type:[String]
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

bookSchema.index({ categories: 1}, {tags: 1 });

module.exports = mongoose.model('books', bookSchema)