const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const {performance} = require('perf_hooks')

//Конвертирует html с css и изображениями из папки unzipedTEMP в pdf, затем удаляет их.
//Возвращает объект, который содержит путь к pdf файлу и время конвертации.
module.exports = (unzipPath, fileName) => {
    let time = 0
    const pdfPath = path.join('pdfTEMP', fileName + '.pdf')
    return new Promise((resolve, reject) => {
        const start = performance.now()
        exec(`wkhtmltopdf --allow ${unzipPath} ${unzipPath}\\index.html ${pdfPath}`, (err, stdout, stderr) => {
            if (err) {
                reject(err)
            }
            fs.rm(unzipPath, { recursive: true }, () => { })
            const end = performance.now()
            time = end - start
            resolve({ pdfPath, time })
        })
    })
}