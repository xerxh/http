const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

const wait = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}
http.createServer(function (request, response) {
    console.log('request come', request.url)
    const html = fs.readFileSync('test.html' ,'utf-8')
    if (request.url === '/') {
        response.writeHead(200, {
            'Content-Type': 'test.html'
        })
        response.end(html)
    }

    if (request.url === '/data') {
        response.writeHead(200, {
            // 'Cache-Control': 'Max-age=20'
                // private表示只有浏览器进行缓存  代理服务器不会进行缓存
                // no-store 所以都不缓存
            // 'Cache-Control': 'Max-age=20 private'
            'Cache-Control': 's-maxage=200',
            // 每次对比请求头携带的 X-Test-Cache 值 相同就取缓存
            'Vary': 'X-Test-Cache'
        })
        wait(2).then(() => response.end('ok'))
    }
}).listen(8887)

console.log('server listening 887')