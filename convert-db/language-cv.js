const readline = require('readline')
    , fs = require('fs')
    , uuid = require('uuidv4')
    , rl = readline.createInterface({
        input: fs.createReadStream('language.json')
    })
    , Language = require('./models/language');
require('./rorDB');

(async () => {
    try {
        let result = []
        rl.on('line', line => {
            line = JSON.parse(line)
            result.push(new Language({
                id: uuid(),
                language: line.language,
                a2Code: line.a2Code,
                a3Code: line.a3Code,
                numCode: line.numCode,
                phoneCode: line.phoneCode
            }))
        })

        await rl.once('close', () => {
            Language.insertMany(result).then((result) => {
                console.log('upload done!')
            }).catch(err => console.log(err))
        })
    } catch (error) {
        console.log(error)
    }
})()