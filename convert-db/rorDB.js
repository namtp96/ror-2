const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://111:111@13.250.97.228:27017/ror'
, { useNewUrlParser: true, poolSize: 300 })
.then(() => console.log('connected to db'))
.catch(err => console.log(err))