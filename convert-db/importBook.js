const book = require('./models/book')
    , readline = require('readline')
    , tag = require('./models/tag')
    , category = require('./models/category')
    , language = require('./models/language')
    , source = require('./models/source')
    , fs = require('fs')
    , uuid = require('uuidv4')
    , mongoose = require('mongoose');

require('./rorDB');

