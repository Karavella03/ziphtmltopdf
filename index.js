const http = require('http')

const uploadFile = require('./utils/uploadFile')

http.createServer(async (req, res) => {
    let originalName = ''
    if (req.url === '/api/ziphtmltopdf' && req.method.toLocaleLowerCase() === 'post') {
        const upload = await uploadFile(req)
        originalName = upload.originalName
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}).listen(8080)