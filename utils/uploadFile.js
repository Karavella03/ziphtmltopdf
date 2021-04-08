const formidable = require('formidable')
const path = require('path')

//Загрузка .zip файла и сохраненение с уникальным именем в папке uploadTEMP
//Возвращает объект, в внутри которого file с информацией о загруженном файле и originalName - оригинальное имя файла
module.exports = (req) => {
    let originalName = ''
    const form = formidable({ maxFileSize: 200 * 1024 * 1024 * 1024 })
    form.parse(req)
    form.on('fileBegin', (name, file) => {
        if (file.type !== 'application/zip') {
            form.emit('error', new Error('Not zip format'))
        } else {
            originalName = file.name
            const zipName = Date.now().toString() + '_' + file.name
            file.name = zipName
            const zipPath = path.join(__dirname, '../uploadTEMP', file.name)
            file.path = zipPath
        }
    })
    return new Promise((resolve, reject) => {
        form.on('file', (name, file) => {
            resolve({ file, originalName })
        })
        form.on('error', (err) => {
            reject(err)
        })
    })
}