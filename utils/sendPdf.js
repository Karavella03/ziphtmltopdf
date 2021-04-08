const fs = require('fs')

//Отправляет pdf с оригинальным названием загруженного файла, затем удаляет pdf файл.
module.exports = (res, pdfPath, fileName) => {
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${fileName}.pdf`
    })
    return new Promise((resolve, reject) => {
        const readPdfStream = fs.createReadStream(pdfPath)
        readPdfStream.pipe(res)
        readPdfStream.on('close', () => {
            fs.unlink(pdfPath, () => { })
            resolve()
        })
        readPdfStream.on('error', (err) => {
            reject(err)
        })
    })
}
