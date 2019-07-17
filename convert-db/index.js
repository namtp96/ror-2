const readline = require('readline')
    , fs = require('fs')

const rl = readline.createInterface({
    input: fs.createReadStream('book.json')
})

const outFile = fs.createWriteStream('book-cv.json')

const cusSplit = (data, char) => {
    if(data != '' && typeof data == 'string' && data != 'n/a') 
        return data.split(char)

    return 'n/a'
}

const cusSlice = (data, charx, chary) => {
    if(data != '' && typeof data == 'string' && data != 'n/a') 
        return data.slice(charx, chary)

    return 'n/a'
}


rl.on('line', (line) => {
    line = JSON.parse(line)
    const shortContent = cusSlice(line.Content, 0, 100)
    const book = {
        _id: line._id['$oid'],
        title: line.Title ? line.Title : 'unknow',
        titleWords: cusSplit(line.Title, ' '),
        shortContent: shortContent + '...',
        shortContentWords: cusSplit(shortContent, ' '),
        content: line.Content ? line.Content : 'unknow',
        excerpt: line.Excerpt ? line.Excerpt : 'unknow',
        authors: cusSplit(line['Author Username'], ','),
        writers: cusSplit(line.Writers, ','),
        categories: cusSplit(line.Categories, '|'),
        tags: cusSplit(line.Tags, '|'),
        size: line['bi_filesize'] != 'NaN' ? parseInt(line['bi_filesize']) : 0,
        publisher: line.Publishers,
        published: line.Date,
        pages: line.bi_pages,
        language: cusSplit(line.bi_language),
        formats: cusSplit(line.bi_fileformat)
    }
    outFile.write(JSON.stringify(book) +  '\n')
})