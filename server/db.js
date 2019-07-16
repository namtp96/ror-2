const mongoose = require('mongoose')
    , conf = require('./conf')

// connect to the database
const db = mongoose.connect(conf.db.url, conf.db.options, (err) => {
    if(err) return console.log(`database connection error: ${err}`)
    console.log('database connected')
})

module.exports = db