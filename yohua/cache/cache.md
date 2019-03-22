# 浏览器缓存
### Cache-Control (协商缓存策略)
1. max-age      (指定缓存的最大有效时间--指定在private设备浏览器中缓存 返回状态为 200)
2. s-maxage     (指定缓存的有效时间--只能在public缓存设备使用如CDN服务器 返回状态为 304   优先级 > max-age)
3. private  私有的 一般指用户客户端浏览器
4. public   公共的 一般指代理服务器如CDN
5. no-cache 每次都会向服务器发送请求 通过服务器的判断来判断浏览器的缓存是否过期，从而决定是否使用缓存
6. no-store 完全不会使用任何缓存策略

max-age(http1.1)优先级 > expires(http1.0)

### Expires
1. 缓存的过期时间，用来指定资源到期的时间，是服务器端的具体时间点
2. 告诉浏览器在过期时间前浏览器可以直接从浏览器缓存中获取数据，而不用再次请求
问题：启用了浏览器缓存 在过期时间内 无法感知服务器的更新。

### Last-Modified/If-Modified-Since(解决缓存不能感知服务器变化的问题)
1. 基于客户端和服务器端协商的缓存机制
2. last-modified -- response header(最后修改时间)
3. if-modified-since -- request header
4. 需要与cache-control共同使用(如果max-age没有过期只会获取浏览器缓存)

当服务器为客户端发送请求资源时会在response header中携带last-modified标记(记录了当前资源在服务器的最后修改时间),
当客户端再次向服务器请求相同资源时会在request header中用if-modified-since携带上次服务器携带回来的最后修改时间。服务器获取此时间对比资源的最新更新时间。如果相同，说明没有进行修改可以使用缓存，返回304浏览器会在缓存中获取，如果不同说明有修改，将最新数据返回，并携带最新的资源修改时间。

##### last-modified缺点
1. 可能某些服务端不能获取精确的修改时间(可能获取不到最新内容)
2. 可能有些文件修改时间变了，但文件内容却没有发生改变(可能使缓存失效 -- 解决利用md5确定文件内容的变化)

### Etag/If-None-Match(可以解决last-modified缺点)
etag优先级 > last modified

1. 文件内容的hash值(md5确保了文件变化的准确性)
2. etag -- response header
3. if-none-match -- request header
4. 需要与cache-control共同使用

当服务器为客户端发送请求资源时会在response header中携带 etag 标记(携带文件内容的hash值),当客户端再次向服务器请求相同资源时携带if-none-match(上次etag携带的hash值)，服务器端获取hash值后和最新文件的hash进行对比,如果相同，说明没有修改可以使用缓存,返回304。如果不同说明文件内容有变化，将最新数据返回并携带最新资源的hash值,返回200。

