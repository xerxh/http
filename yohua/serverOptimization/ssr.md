### SSr
利用node.js和客户端相同的语言用服务器的性能来对客户端的大量数据进行计算从而提升性能。

1. 理解vue渲染的问题
    流程：
        1. 先下载vue.js
        2. 执行vue.js代码
        3. 生产html页面
        (会造成首屏加载慢)
    1. 没有前端框架的时候 使用jsp php在服务器进行数据的填充，发送给客户端的就是已经填充好的html(由于前后端分类，和前端代码的可维护可管理性变成了异步加载数据方式)
    2. 然后随着前端工程化和组件化的出现开始使用react和vue/Anglar前端MVVM框架(首屏性能很不好，而且不利于seo)
    3. 解决方案：(多层次的优化方案)
        1. 构建层模板编译(vue 2.0)
        2. 数据无关的prerender的方式(对于与数据无关的页面可以提前编译成静态的html)
        3. 服务器端渲染(ssr 直出同构 解决首屏渲染问题)

2. vue-ssr的原理和应用