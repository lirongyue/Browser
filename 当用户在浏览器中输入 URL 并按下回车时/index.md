# 用户输入 URL
你做的事：在浏览器地址栏输入 https://example.com 然后按下回车。

浏览器做的事：

    判断输入的是搜索关键字还是 URL。

    如果是 URL，会先进行 URL 解析（protocol、host、port、path、query、fragment）。

      https://www.example.com:8080/path/to/page?name=value&search=test#section1
        \___/   \_____________/\___/\___________/\_____________/ \_______/
            |           |         |        |            |              |
        协议      主机名      端口     路径        查询参数       片段标识符

    检查是否是已保存的书签、历史记录或 PWA 应用（可能直接用缓存而不是发请求）。

# 浏览器检查缓存
    浏览器会先检查：

        Service Worker 缓存（如果网站注册了 SW）。

        Memory Cache（页面没关闭时的内存缓存）。

        Disk Cache（硬盘缓存文件）。

        HTTP 缓存策略（ETag、Last-Modified、Cache-Control 等）。

    如果命中强缓存（Cache-Control: max-age 或 Expires），直接用缓存文件，不发请求。

    如果命中协商缓存（ETag 或 Last-Modified），会发请求但只下载响应头。

    只有缓存都没命中，才进入下一步 DNS 解析。

# DNS 解析
    目标：把域名（example.com）转换为 IP 地址（如 93.184.216.34）。

    步骤：浏览器 DNS 缓存（Chrome 默认 1 分钟）
        浏览器 DNS 缓存（Chrome 默认 1 分钟）。
        系统 DNS 缓存（操作系统维护的缓存）。
        本地 hosts 文件。
        向本地 DNS 服务器（通常是 ISP 提供）发 UDP 请求
        如果本地 DNS 没有结果，递归查询：
            根域名服务器（.）
            顶级域名服务器（.com）
            权威域名服务器（example.com）

    结果：得到 IP 地址和 TTL（缓存有效期）

# 建立 TCP 连接
    过程：
        浏览器向服务器 IP 发起 TCP 三次握手：
            SYN（客户端 → 服务器，请求建立连接）
            SYN-ACK（服务器 → 客户端，同意并确认）
            ACK（客户端 → 服务器，确认）

    端口：
    HTTP 默认 80，HTTPS 默认 443。
    注意：HTTP/2 和 HTTP/3 会复用连接，可能不需要新建。

# 建立 TLS（HTTPS 专属）

    如果是 HTTPS，还要进行 TLS 握手


# 发送 HTTP 请求
    浏览器构造 HTTP 请求报文：
        GET /index.html HTTP/1.1
        Host: example.com
        User-Agent: Mozilla/5.0 ...
        Accept: text/html
        Cookie: ...

# 服务器处理请求
    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: 1024
    Cache-Control: max-age=3600
    ETag: "abc123"

    <!DOCTYPE html>
    <html>...</html>
    
# 浏览器渲染



# TCP连接过程
1. 第一次握手：客户端 → 服务器（SYN）
    客户端 发送一个 SYN 报文：
        SYN=1（表示请求建立连接）
        ACK=0（第一步没有确认号）
        Seq = x（客户端选择的初始序列号 ISN，随机数）
    状态变化：
        客户端：CLOSED → SYN_SENT
        服务器：还没变化（等待收到包）
    目的：
        告诉服务器“我想和你连接”
        告诉服务器“我这边的发送序列号从 x 开始”
2. 第二次握手：服务器 → 客户端（SYN + ACK）
    服务器 收到 SYN 后：
        分配 TCP 缓存和资源
        回复 SYN+ACK 报文：
            SYN=1（我也要建立连接）
            ACK=1（确认收到你的 SYN）
            Seq = y（服务器选择的 ISN，随机数）
            Ack = x + 1（确认号，表示我已收到客户端的序列号 x）
    状态变化：
        服务器：LISTEN → SYN_RECEIVED
    目的：
        告诉客户端“我收到了你的 SYN”
        告诉客户端“我这边的序列号从 y 开始”

3. 第三次握手：客户端 → 服务器（ACK）
    客户端 收到 SYN+ACK 后：
        回复 ACK 报文：
            SYN=0（不再请求新连接）
            ACK=1（确认收到服务器的 SYN）
            Seq = x + 1（客户端自己的序列号）
            Ack = y + 1（确认号，表示我已收到服务器的序列号 y）
    状态变化：
        客户端：SYN_SENT → ESTABLISHED
        服务器：SYN_RECEIVED → ESTABLISHED