var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const tag = require('../models/tag')
const mongoose = require('mongoose')

MongoClient.connect(url, { useNewUrlPaser: true, poolSize: 300 }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("ror");
  dbo.collection("book").distinct('Tags').then((data) => {
    let a = []
    let b = []
    let c = []
    data.forEach(item => {
      let b = item.split('|')
      a = a.concat(b)
    })
    a.forEach(item => {
      if (!(b.includes(item)) && item != '') b.push(item)
    })
    b.forEach(item => {
      c.push(new tag({
        _id: new mongoose.Types.ObjectId().toHexString(),
        name: item
      }))
    })
    console.log(c)
    dbo.collection('tags').insertMany(c).then(() => console.log('ok'))
  })
})