const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const bookSchema = new Schema({

    id: String,
    site: {
        type: String,
        required:[true,'missing site']
    },
    link : {
        type: String,
        required: [true, 'missing link']
    },
    status:{
        type: Boolean
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

module.exports = mongoose.model('sources', bookSchema)
