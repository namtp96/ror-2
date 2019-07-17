const readline = require('readline');
const fs = require('fs');
const mongoose = require('mongoose');
const filePath = './book-cv.js';

(async () => {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            output: fs.createWriteStream('book-test.json')
        })

        rl.on('line', line => {
            line = JSON.parse(line)

            rl.write(line + '\n')
        })
    } catch (error) {
        console.log(error)
    }
})()