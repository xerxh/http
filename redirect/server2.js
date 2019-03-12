const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    if (request.url === '/') {
        // 301 永久重定向
        // 302 服务器重定向
        response.writeHead(302, {
            'Location': '/new'
        })
        response.end('')
    }
    if (request.url === '/new') {
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        }) 
        const html =  new Buffer('<div>我的萌萌哒师傅和师姐</div>')
        response.end('<div>我的萌萌哒师傅和师姐</div>')
    }

}).listen(8887)

console.log('server listening 887')