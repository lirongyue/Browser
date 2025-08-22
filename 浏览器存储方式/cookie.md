# Cookie 详解

## 特点
- **存储位置**  
  Cookie 存储在浏览器中，由浏览器负责管理。
- **数据传递**  
  每次浏览器发送请求到同一域名时，都会自动将 Cookie 附加到 HTTP 请求头中发送给服务器。
- **持久性**  
  Cookie 可以设置为短期（会话级别，浏览器关闭后失效）或长期（通过 `Expires` 或 `Max-Age` 设置过期时间）。
- **大小限制**  
  - 每个 Cookie 大小通常限制为 4KB 左右。  
  - 浏览器对单个域名可以存储的 Cookie 数量有限制（每个域最多存储 180～300 个 Cookie，总大小约为 4MB）。
- **安全性**  
  Cookie 可以通过 HTTPS 加密传输，但存储在客户端的 Cookie 容易受到跨站脚本（XSS）攻击，除非设置了 `HttpOnly` 标志，才能防止 JavaScript 访问它们。

---

## 用途
- **身份验证**  
  用来存储用户的登录状态，例如存储一个 `session_id` 来标识用户会话。
- **跟踪用户行为**  
  用于存储用户偏好、广告跟踪、购物车信息等。

---

## 优缺点

### 优点
- 自动随 HTTP 请求发送给服务器，方便客户端和服务器之间传递数据。
- 支持设置过期时间，适合长时间保存用户状态。

### 缺点
- 有存储大小限制。
- 安全性较低，容易受到 XSS 和 CSRF 攻击。

---

## 常见示例

```http

Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600
res.cookie('username', 'JohnDoe', {
    domain: '.example.com',          // 子域名共享
    path: '/admin',                  // 仅在 /admin 路径下有效
    expires: new Date('2024-12-31'),// 过期时间
    secure: true,                   // 仅在 HTTPS 下传输
    httpOnly: true,                 // 不允许 JavaScript 访问
    sameSite: 'Strict'              // 同站请求才携带 Cookie
});

    // 1. SameSite=Strict
    //   作用：最严格的模式。只有在同站请求（即 URL 的来源和 Cookie 的 Domain 相同时）时才会发送 Cookie。
    //   特点：
    //   禁止所有跨站请求携带 Cookie。
    //   适合需要高安全性且不涉及第三方嵌套的场景。
    //   缺点：
    //   用户体验不佳，例如跨站登录跳转可能会失败。
    //   使用场景：
    //   银行、金融等敏感操作的站点。

    // 2. SameSite=Lax
    //   作用：稍宽松的模式，允许部分跨站请求携带 Cookie。
    //   特点：
    //   仅在安全的跨站请求中携带 Cookie，比如通过链接点击（GET 请求）。
    //   阻止大多数跨站请求携带 Cookie，如表单提交（POST 请求）或嵌入式资源加载。
    //   优点：
    //   在不完全牺牲用户体验的前提下，提高了安全性。
    //   缺点：
    //   某些场景下仍可能被跨站跟踪（如通过链接）。
    //   使用场景：
    //   常规站点，特别是需要部分跨站交互的功能。

    // 3. SameSite=None
    //   作用：允许 Cookie 随跨站请求发送，但需要配合 Secure 属性。
    //   特点：
    //   完全开放模式，允许所有跨站请求携带 Cookie。
    //   适合需要跨站交互（如第三方登录、广告跟踪）的场景。
    //   注意事项：
    //   必须使用 HTTPS，否则浏览器会拒绝设置 Cookie。
    //   比较容易被滥用，可能导致安全风险。
    //   使用场景：
    //   第三方服务或需要在多个站点共享 Cookie 的场景。
```
# Cookie 的独特性
- Cookie 是唯一一种可以由服务器和客户端两者同时进行控制的存储机制。

- 服务器可以通过 HTTP 响应头 Set-Cookie 来设置和管理 Cookie，
    而客户端可以使用 JavaScript 操作 Cookie。

- 这种双重控制机制在身份认证、用户跟踪等场景中非常重要。

- 与之相比，Session 和 localStorage/sessionStorage 依赖不同的存储策略，
   不能由客户端和服务器同时控制。