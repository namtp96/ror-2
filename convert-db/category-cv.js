const readline = require('readline')
    , fs = require('fs')
    , uuid = require('uuidv4')
    , rl = readline.createInterface({
        input: fs.createReadStream('tag.json')
    })
    , Tag = require('./models/tag');
require('./rorDB');

(async () => {
    try {
        let result = []
        rl.on('line', line => {
            line = JSON.parse(line)
            result.push(new Tag({
                id: uuid(),
                name: line.name
            }))
        })

        await rl.once('close', () => {
            Tag.insertMany(result).then((result) => {
                console.log('upload done!')
            }).catch(err => console.log(err))
        })
    } catch (error) {
        console.log(error)
    }
})()