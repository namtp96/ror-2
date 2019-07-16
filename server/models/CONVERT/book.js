var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const Book = require('../book')
const mongoose = require('mongoose')

MongoClient.connect(url, { useNewUrlPaser: true, poolSize: 300 }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("ror");
  var query = {};
  dbo.collection("book").find({}).toArray().then((data) => {
    let len = data.length
    let y = Math.floor(len / 20)
    let x = 5
    let booka = []
    for (let i = 1; i < len; i++) {
      if (i == y) {
        console.log(`${x}%`)
        x += 5
        y += Math.floor(len / 20)
      }

      const titleWords = () => {
        return data[i].title.split(' ')
      }
      const shortContent = () => {
        if (data[i].Content.split('.')[0]) return data[i].Content.split('.')[0]

        return 'defaul short content'
      }
      const shortContentWords = () => {
        if (data[i].Content.split('.')[0]) return data[i].Content.split('.')[0].split(' ')

        return ['defaul', 'short', 'content']
      }
      const author = () => {
        if (data[i]['Author Username'] != '' && typeof data[i]['Author Username'] == 'string') return data[i]['Author Username'].split(/[\|\,]/)

        return 'N/A'
      }
      const writes = () => {
        if (data[i].Writers.split != '' && typeof data[i].Writers == 'string') return data[i].Writers.split(/[\|\,]/)

        return 'N/A'
      }
      const language = function () {
        if (data[i]['bi_language'] != '' && typeof data[i]['bi_language'] == 'string') return data[i]['bi_language'].split(/[\|\,]/)

        return 'N/A'
      }
      const formats = function () {
        if (data[i]['bi_fileformat'] != '' && typeof data[i]['bi_language'] == 'string') return data[i]['bi_fileformat'].split(/[\|\,]/)

        return 'N/A'
      }

      booka.push(new Book({
        _id: new mongoose.Types.ObjectId().toHexString(),
        isActivated: true,
        isPublish: true,
        title: data[i].title,
        titleWords: titleWords(),
        shortContent: shortContent(),
        shortContentWords: shortContentWords(),
        content: data[i].Content ? data[i].Content : 'N/A',
        excerpt: data[i].Excerpt ? data[i].Excerpt : 'N/A',
        authors: author(),
        writers: writes(),
        categories: data[i].Categories ? data[i].Categories.split(/[\|\,]/) : 'N/A', // split string to array
        tags: data[i].Tags ? data[i].Tags.split(/[\|\,]/) : 'N/A',
        size: data[i].bi_filesize,
        publisher: data[i].Publishers,
        published: data[i].Date,
        pages: data[i].bi_pages,
        language: language(),
        formats: formats()
      }))
    }
    console.log('\nsave')
    dbo.collection("books").insertMany(booka).then(() => console.log('done'))
  })
})
