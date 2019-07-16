const service = require('./service')
    , bookService = require('../../../services/book')
    , Err = require('../../../services/err')

exports.getManyBook = async (req, res, next) => {
    const quantity = req.params.quantity > 1 ? req.params.quantity : next(new Err('missing params', 'B01'))
    
    if (quantity) {
        try {
            const books = await service.getManyBook(quantity)
            res.status(200).json(books)
        } catch (error) {
            next(new Err(error.message, 'B02'))
        }
    }
}

exports.getOneBook = async (req, res, next) => {
    try {
        const book = await bookService.getOneBook()
        res.status(200).json(book)
    } catch (error) {
        next(new Err(error.message, 'B01'))
    }
}