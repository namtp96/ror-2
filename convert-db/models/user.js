const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const userSchema = new Schema({
    gender: {
        type: String,
        required: [true, 'missing gender']
    },
    isPrime: {
        type: String,
        required: [true, 'missing isPrime']
    },
    email: {
        type: String,
        required: [true, 'missing email']
    },
    phone: {
        type: String,
        required: [true, 'missing phone']
    },
    address: {
        type: String,
        required: [true, 'missing address']
    },
    books: {
        type: [String]
    },
    name: {
        type: String,
        minlength: [4, 'name to short'],
        maxlength: [50, 'name to long'],
        required: [true, 'missing name']
    },
    picture: {
        type: String,
        required: [true, 'missing picture']
    },
    age: {
        type: Number,
        required: [true, 'missing age']
    },  
    balance: {
        type: Number,
        required: [true, 'missing balance']
    },
    hash: {
        type: String,
        required: [true, 'missing hash']
    }
})

module.exports = mongoose.model('users', userSchema)