 // SCP内容安全策略
const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    if (request.url === '/'){
        const html = fs.readFileSync('test.html')
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            // 禁止浏览器的对页面script行内代码  可以用来防止注入脚本
            // 只能通过外部链接http或者https进行脚本加载
            // 设置加载资源的限制
            // 'Content-Security-Policy': 'default-src http: https:'
                // 限制所有的src链接
            // 'Content-Security-Policy': 'default-src \'self\'; form-action \'self\'' 
            // 'Content-Security-Policy': 'script-src \'self\'; form-action \'self\''        
               // 当出现不符合情况时可以设置向服务器自动上报
               // 也可以设置在mata标签来设置
               // 'Content-Security-Policy': 'script-src \'self\'; form-action \'self\'; report-uri /report'        

        }) 
        response.end(html)
    }else{
        const html = fs.readFileSync('test.html')
        response.writeHead(200, {
            'Content-Type': 'application/javascript',
            // 禁止浏览器的对页面script行内代码  可以用来防止注入脚本
            // 只能通过外部链接http或者https进行脚本加载
            // 'Content-Security-Policy': 'default-src http: https:'
        }) 
        response.end('console.log("师父和师姐")')
    }

}).listen(8887)

console.log('server listening 887')