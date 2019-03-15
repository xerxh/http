const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    const html = fs.readFileSync('test.html', 'utf8')
    if (request.url === '/'){
        const host = request.headers.host
        if (host === 'a.test.html')
        response.writeHead(200, {
            'Content-Type': 'test.html',
            'set-Cookie': ['id=123; Max-age=2', 'abc=456; HttpOnly']
        })
        response.end(html) 
    }

}).listen(8889)

console.log('server listening 888')