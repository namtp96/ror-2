const Book = require('../models/book')
    , Err = require('../services/err')

exports.getOneBook = async () => {
    try {
        return await Book.findOne({})
    } catch (error) {
        throw new Err(error.message, 'B02')
    }
}