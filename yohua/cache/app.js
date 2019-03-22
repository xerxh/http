var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var mime = require('./mime').types
var config = require('./config')
var zlib = require('zlib')

var port = 8000

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname
    var realPath = 'assets' + pathname
    var ext = path.extname(realPath)
    console.log(ext)
    ext = ext ? ext.slice(1) : 'unknown'
    var contentType = mime[ext] || 'text/plain'

    // 匹配缓存策略  设置浏览器强缓存策略
    if (ext.match(config.Expires.fileMatch)) {
        var expires = new Date()
        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000)
        // 将时间根据世界时间UTC转换为字符串
        response.setHeader('Expires', expires.toUTCString())
        response.setHeader('Cache-Control', "max-age=" + config.Expires.maxAge)

    }
    // 获取文件最后修改日期(协商缓存)
    fs.stat(realPath, function(err, start){
        var lastModified = start.mtime.toUTCString()
        response.setHeader('Last-Modified', lastModified)
        var ifModified = request.headers['if-modified-since']
        // 对比last-modified标识时间
        if (ifModified && lastModified == ifModified){
            // 相同 返回304
            response.writeHead(304, 'Not modified')
            response.end()
        } else {
            // 判断文件是否存在 进行文件读取
            fs.exists(realPath, function(exists){
                // 不存在
                if (!exists) {
                    response.writeHead(404, {
                        'Content-Type': contentType
                    }) 
                    response.write('this request URL' + pathname + 'is not')
                    response.end() 
                } else {
                    // 以二进制的方式读取文件
                    fs.readFile(realPath, 'binary', function(err, file){
                        if (err) {
                            response.writeHead(500, {
                                'Content-Type': contentType
                            })
                            response.end()
                        } else {
                            response.writeHead(200, {
                                'Content-Type': contentType,
                                'Content-Encoding': 'gzip'
                            })
                            // 开启gzip压缩 --> zlib.gzipSync(file)
                            
                            response.write(file, 'binary')
                            response.end()
                        }
                    })
                }
            })
        }
    })

})
server.listen(port)
console.log('Server runing at port : ' + port)