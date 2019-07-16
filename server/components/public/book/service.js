const Book = require('../../../models/book')
    , Err = require('../../../services/err')

exports.getManyBook = async (quantity) => {
    try {
        return await Book.find({}).limit(parseInt(quantity))
    } catch (error) {
        throw new Err(error.message, 'B02')
    }
}