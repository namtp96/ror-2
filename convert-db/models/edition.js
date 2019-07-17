const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const bookSchema = new Schema({

    id: Schema.Types.ObjectId,
    edition: {
        type: String,
        required: [true, 'missing edition']
    },
    collector: {
        type: String,
        required: [true, 'missing collector']
    },
    publisher: {
        type: String,
        required:[true, 'missing publisher']
    },
    type: {
        type: String,
        required: [true, 'missing type']
    },
   
}, 
{ timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' }})

module.exports = mongoose.model('editions', bookSchema)
