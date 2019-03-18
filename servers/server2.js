const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.headers.host)
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Allow-Methods': 'POST, PUT, Delete',
        // 预请求的时间
        'Access-Control-Max-Age': '1000',
        'Content-Type': 'test.html'
            // 请求 客户端
        // Accept
        // Accept-Encodong
        // Accept-Language
        // User-Agent
            // 服务器
        // Content-Type
        // Content-Encoding
        // Content-Laguage

    })
    response.end(html)

}).listen(8887)

console.log('server listening 887')