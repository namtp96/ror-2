var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
const author = require('../author')
const mongoose = require('mongoose')

MongoClient.connect(url, { useNewUrlPaser: true, poolSize: 300 }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("ror");
    let c = []
    const a = ['Phelps', 'Bright', 'Fields', 'Letitia', 'Stafford', 'Webb', 'Flores']
    const b = ['Lenore', 'Hughes', 'Lindsay', 'Cervantes', 'Curtis']

    

    for(let i = 1; i <= 200; i++){
        const rndName = a[Math.floor(Math.random() * a.length)]
        const rndHo = b[Math.floor(Math.random() * a.length)]
        c.push(new author({
            id: new mongoose.Types.ObjectId().toHexString(),
            username: rndName + Math.floor(Math.random() * 100),
            email: rndName + '@ror.io',
            firstName: rndName,
            lastName: rndHo
          }))
    }
    
    console.log(c)
    dbo.collection('authors').insertMany(c).then(() => console.log('ok'))
})
