const book = require('./models/book')
const readline = require('readline')
    , tag = require('./models/tag')
    , category = require('./models/category')
    , language = require('./models/language')
    , source = require('./models/source')
    , fs = require('fs')
    , uuid = require('uuidv4');

require('./rorDB');
console.log('get all data form db');

(async function run() {
    const tags = await tag.find()
    const categories = await category.find()
    const languages = await language.find()
    const sources = await source.find()
    let arr = []
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('book-cv.json')
        })
        console.log('creating book data')
        rl.on('line', (line) => {
            line = JSON.parse(line)

            let tagsID = []

            for (let i = 0; i < line.tags.length; i++) {
                const tagID = tags.find(item => {
                    return item['name'] == line.tags[i]
                })
                if (!tagID) return ' '

                tagsID.push(tagID['id'])
            }

            let categoriesID = []

            for (let i = 0; i < line.categories.length; i++) {
                const tagID = categories.find(item => {
                    return item['name'] == line.categories[i]
                })
                if (!tagID) return ' '

                categoriesID.push(tagID['id'])
            }

            let languagesID = []

            for (let i = 0; i < line.language.length; i++) {
                const tagID = languages.find(item => {
                    return item['language'] == line.language[i]
                })
                if (!tagID) return ' '

                languagesID.push(tagID['id'])
            }

            let sourceID = []

            const s = sources.find(item => {
                return item['link'] == line.source
            })

            sourceID.push(s['id'])

            arr.push(new book({
                id: uuid(),
                title: line.title,
                titleWords: line.titleWords,
                shortContent: line.shortContent,
                shortContentWords: line.shortContentWords,
                content: line.content,
                excerpt: line.excerpt,
                authors: "0fc3d881-c160-4f5c-9f33-6882e0acd9d8",
                writers: line.writers[0] != '' && line.writers[0] != undefined ? line.writers[0].split('|') : line.writers,
                tags: tagsID,
                size: line.size,
                publisher: line.publisher,
                published: line.published,
                categories: categoriesID,
                pages: (line.pages != '' && line.pages != 'NaN' && typeof line.pages == 'number') ? line.pages : 0,
                language: languagesID,
                formats: line.formats,
                source: sourceID,
                biIsbn: typeof line['biIsbn'] == 'string' ? line['biIsbn'] : '',
                biFileUrl: line['biFileUrl']
            }))
        })
        await rl.once('close', () => {
            console.log('save data to db')
            book.insertMany(arr).then((result) => {
                console.log(result)
            }).catch(err => console.log(err))
        })
    } catch (err) {
        console.log(err)
    }
})()