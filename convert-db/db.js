const mongoose = require('mongoose')
const book = require('./models/book')
const readline = require('readline')
const { once } = require('events')
    , fs = require('fs');

(async function run() {
    mongoose.connect('mongodb+srv://nam:clay71715@ror-v0rxn.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, poolSize: 300 })
    let arr = [];
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('book-cv.json')
        })
        rl.on('line', (line) => {
            line = JSON.parse(line)
            arr.push(new book({
                _id: line['_id'],
                title: line['title'],
                titleWords: line['titleWords'],
                shortContent: line['shortContent'],
                shortContentWords: line['shortContentWords'],
                content: line['content'],
                excerpt: line['excerpt'],
                authors: line['authors'],
                writers: line['writers'],
                categories: line['categories'],
                tags: line['tags'],
                size: line['size'],
                publisher: line['publisher'],
                published: line['published'],
                pages: typeof line['pages'] == 'number' ? line['pages'] : 0,
                language: line['language'],
                formats: line['formats']
            }))
        })
        await once(rl, 'close');
        book.insertMany(arr).then((result) => {
            console.log('upload done!')
        }).catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
})()