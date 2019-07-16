var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
const Book = require('./models/book')

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("ror");
  var query = {};
  dbo.collection("book-1").find(query).toArray(function (err, data) {
    if (err) throw err;

    let len = data.length
    let y = Math.floor( len / 20)
    let x = 5
    let booka = []
    for (let i = 1; i < len; i++) {
      if(i == y) {
        console.log(`${x}%`)
        x += 5
        y += Math.floor(len / 20)
      }


      booka.push(new Book({
        id: i,
        title: data[i].Title,
        content: data[i].Content,
        excerpt: data[i].Excerpt,
        author: data[i].Writers ? data[i].Writers.split(/[\|\,]/) : data[i].Writers,
        categories: data[i].Categories ? data[i].Categories.split(/[\|\,]/) : data[i].Categories, // split string to array
        tags: data[i].Tags ? data[i].Tags.split(/[\|\,]/) : data[i].Tags,
        size: data[i].bi_filesize,
        publisher: data[i].Publishers,
        published: data[i].Date,
        pages: data[i].bi_pages,
        language: data[i].bi_language,// ? data[i].bi_language.split(/[\|\,]/) : data[i].bi_language,
        format: data[i].bi_fileformat, // ? data[i].bi_fileformat.split(/[\|\,]/) : data[i].bi_fileformat
      }))
    }
    console.log('\nsave')
      dbo.collection("book").insertMany(booka).then(() => console.log('done'))
  });
});