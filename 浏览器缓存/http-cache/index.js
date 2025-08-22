const http = require('http')
const fs = require('fs')
const url = require('url')
const etag = require('etag')

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    if (pathname === '/') {
        const data = fs.readFileSync('./index.html')
        res.end(data)
    } else if (pathname === '/img/1.jpg') {
        const data = fs.readFileSync('./img/1.jpg')
        res.writeHead(200, {
            expires: new Date('2024-10-9 18:25:00').toUTCString()
        })
        res.end(data)
    } else if (pathname === '/img/2.jpg') {
        const data = fs.readFileSync('./img/2.jpg')
        res.writeHead(200, {
           'Cache-Control': 'max-age=10,public,no-cache'
        })
        res.end(data)
    } else if (pathname === '/img/3.jpg') {
        const data = fs.readFileSync('./img/3.jpg')
        const { mtime } = fs.statSync('./img/3.jpg')
        // modified 改进的；since：从...以后
        const ifModifiedSince = req.headers['if-modified-since']
        if (ifModifiedSince === mtime.toUTCString()) {
            // 缓存生效
            res.statusCode = 304
            res.end()
            return
        }
        res.writeHead(200, {
           'last-modified': mtime.toUTCString(),
           'cache-control': 'no-cache'
        })
        res.end(data)
    } else if (pathname === '/img/4.jpg') {
        const data = fs.readFileSync('./img/4.jpg')
        const etagContent = etag(data)
        const ifNoneMatch = req.headers['if-none-match']
        if (etagContent === ifNoneMatch) {
            res.statusCode = 304
            res.end()
            return
        }
        res.setHeader('etag', etagContent)
        res.setHeader('cache-control', 'no-cache ')
        res.end(data)
    } else {
        res.statusCode = 404
        res.end()
    }
}).listen(3100, () => {
    console.log('node服务运行端口:3100')
})