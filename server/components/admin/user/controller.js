const User = require('../../../models/user')
    , bookService = require('../../../services/book')
    , services = require('./service')
    , Err = require('../../../services/err')
    , Book = require('../../../models/book')
    , fs = require('fs')

exports.userGetOneBook = async (req, res, next) => {
    try {
        const book = await bookService.getOneBook()
        res.status(200).send(book)
    } catch (error) {
        next(new Err(error.message, 'B01'))
    }
}

// exports.getUsersWithKeyWord = async (req, res, next) => {
//     switch(req.params.key){
//         case 'email':
//         case 'phone':
//         case 'name':
//             break
//         default: next(new Err('bad key', 'A01'))
//     }
//     let data = {
//         key : req.params.key,
//         val : req.params.val,
//         id : req.params.id
//     }

//     try {
//         let users = await services.getUsersWithKeyWord(data)
//         res.status(200).send(users)
//     } catch (error) {
//         next(new Err(error.message, 'B01'))
//     }
// }


exports.getUsersWithKeyWord = async (req, res, next) => {
    try {
        let booka = []
        const book = await Book.find({}).limit(10)//, (err, db) => {
            // for (let i = 1; i < db.length; i++) {
            //     booka.push(new Book({
            //         id: index,
            //         title: data.Title,
            //         content: data.Content,
            //         excerpt: data.Excerpt,
            //         author: data.Writers,
            //         categories: data.Categories,
            //         tags: data.Tags,
            //         size: data.bi_filesize,
            //         publisher: data.Publishers,
            //         published: data.Date,
            //         pages: data.bi_pages,
            //         language: data.bi_language,
            //         format: data.bi_fileformat
            //     }))
            // }
        //     booka = db
        // })
        res.send(book)
    } catch (error) {
        next(new Err(error.message, 'B01'))
    }
}