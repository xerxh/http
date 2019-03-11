const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    const html = fs.readFileSync('test.html', 'utf8')
    if (request.url === '/'){
        response.writeHead(200, {
            'Content-Type': 'test.html'
        })
        response.end(html) 
    }
    if (request.url === '/script.js'){

        const etag = request.headers['if-none-match']
        if (etag === '777') {
            response.writeHead(304, {
                'Content-Type': 'text/javascript',
                // 设置多少秒内从缓存读取
                // "Cache-Control": 'max-age=2000000',
                "Cache-Control": 'max-age=2000000, no-cache',
                "Last-Modified": '1234',
                "Etag": '7778'  
            })
            response.end('console.log("lalal")')
        }else{
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                // 设置多少秒内从缓存读取
                // "Cache-Control": 'max-age=2000000',
                "Cache-Control": 'max-age=2000000, no-cache',
                // 记录上次的修改时间
                "Last-Modified": '123',
                // 配合 if-modified-Since/if-Unmodified-Since 
                // 数据签名
                "Etag": '777'
                // 配合 if-none-match/ if-match
    
            })
             response.end('console.log("script load")')

        }
    }

}).listen(8888)

console.log('server listening 888')