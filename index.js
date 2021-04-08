const http = require('http')

const uploadFile = require('./utils/uploadFile')
const unzip = require('./utils/unzip')
const convertToPdf = require('./utils/convertToPdf')
const sendPdf = require('./utils/sendPdf')

http.createServer(async (req, res) => {
    let originalName = ''
    if (req.url === '/api/ziphtmltopdf' && req.method.toLocaleLowerCase() === 'post') {
        const upload = await uploadFile(req)
        originalName = upload.originalName
        const unzipPath = await unzip(upload.file.path, upload.file.name)
        const convertedPdf = await convertToPdf(unzipPath, upload.file.name)
        await sendPdf(res, convertedPdf.pdfPath, originalName)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}).listen(8080)