const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    const html = fs.readFileSync('test.html')
    
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Allow-Methods': 'POST, PUT, Delete',
        // 预请求的时间
        'Access-Control-Max-Age': '1000',
        'Content-Type': 'test.html',
        // 解决浏览器自动预测返回内容 可能有安全隐患
        // 'X-Content-Type-Options': 'nosniff',
        // 返回的压缩格式
        'Content-Encoding': 'gzip'
            // 请求 客户端
        // Accept  可以支持的数据格式
        // Accept-Encodong 压缩方法
        // Accept-Language  支持的语言
        // User-Agent
            // 服务器
        // Content-Type
        // Content-Encoding
        // Content-Laguage

    })
    response.end(zlib.gzipSync(html))

}).listen(8887)

console.log('server listening 887')