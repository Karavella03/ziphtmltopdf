const http = require('http')

const uploadFile = require('./utils/uploadFile')
const unzip = require('./utils/unzip')
const convertToPdf = require('./utils/convertToPdf')
const sendPdf = require('./utils/sendPdf')
const log = require('./utils/log')

http.createServer(async (req, res) => {
    let originalName = ''
    if (req.url === '/api/ziphtmltopdf' && req.method.toLocaleLowerCase() === 'post') {
        try {
            const upload = await uploadFile(req)
            originalName = upload.originalName
            const unzipPath = await unzip(upload.file.path, upload.file.name)
            const convertedPdf = await convertToPdf(unzipPath, upload.file.name)
            await sendPdf(res, convertedPdf.pdfPath, originalName)
            log.message(originalName, convertedPdf.time)
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: err.message }))
            log.error(err, originalName)
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}).listen(8080)