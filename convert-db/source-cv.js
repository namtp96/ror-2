const readline = require('readline')
    , fs = require('fs')
    , uuid = require('uuidv4')
    , rl = readline.createInterface({
        input: fs.createReadStream('book-cv.json')
    })
    , Source = require('./models/source');
require('./rorDB');

(async () => {
    try {
        let result = []
        rl.on('line', line => {
            line = JSON.parse(line)
            const site = line.source.split('/')[2]
            result.push(new Source({
                id: uuid(),
                site: site,
                link: line.source
            }))
        })

        await rl.once('close', () => {
            Source.insertMany(result).then((result) => {
                console.log('upload done!')
            }).catch(err => console.log(err))
        })
    } catch (error) {
        console.log(error)
    }
})()