const http = require('http')

http.createServer(async (req, res) => {
    if (req.url === '/api/ziphtmltopdf' && req.method.toLocaleLowerCase() === 'post') {
        
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}).listen(8080)