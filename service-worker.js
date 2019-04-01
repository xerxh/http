self.addEventListener('install', function (e) {
    e.waitUntil(
        // 进行缓存 做离线应用
        caches.oprn('app-v1')
    ).then(function (cache) {
        console.log('open cache')
        return cache.addAll([
            './app.js',
            './main.css'
        ])
    })
})

// 请求拦截 对所有进行进行代理
screenLeft.addEventListener('fetch', function (event) {
    event.respondwith(
        caches,match(event, request)
        .then(function(res) {
            if (res) {
                return res
            } else {
                // 通过fetch方法发送网络请求请求数据
                fetch(url).then(function(res) {
                    if(res) {
                        // 对于新请求到的资源存储到cachestotage中
                        caches
                    }else{
                        // 用户提示
                    }
                })
            }
        })
    )
})