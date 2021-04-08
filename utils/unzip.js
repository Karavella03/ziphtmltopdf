var AdmZip = require('adm-zip')
const path = require('path')
const fs = require('fs')

//Разархивирует загруженный .zip файл в папку unzipedTEMP, затем удаляет его.
//Возвращает путь к разархивированным файлам.
module.exports = (filePath, filename) => {
    const unzipPath = path.join('unzipedTEMP', filename)
    const zip = new AdmZip(filePath)
    return new Promise((resolve, reject) => {
        zip.extractAllToAsync(unzipPath, true, (err) => {
            if (err) {
                reject(err)
            }
            fs.unlink(filePath, () => { })
            resolve(unzipPath)
        })
    })
}
