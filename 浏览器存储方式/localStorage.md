# localStorage 详解

## 特点
- **存储位置**  
  localStorage 存储在客户端的浏览器中，是 HTML5 引入的一种本地存储机制。
- **数据传递**  
  localStorage 中的数据不会随每次 HTTP 请求自动发送给服务器。它完全在客户端本地操作，需要通过 JavaScript 手动读取和提交。
- **持久性**  
  localStorage 中的数据是持久的，即使用户关闭浏览器，数据也会保留，除非被手动清除或代码中删除。
- **大小限制**  
  localStorage 的存储容量通常比 Cookie 大很多，每个域名可以存储 5-10MB 数据（根据浏览器不同）。
- **安全性**  
  localStorage 中的数据完全由 JavaScript 操作，因此容易受到 XSS 攻击。与 Cookie 不同，它没有 `HttpOnly` 选项，不能限制 JavaScript 访问。

---

## 用途
- 保存用户偏好：如保存用户主题、语言选择、购物车信息等非敏感信息。
- 本地缓存数据：可以用来存储一些静态数据，减少与服务器的交互次数，提高网页加载速度。

---

## 优缺点

### 优点
- 可以存储大量数据，比 Cookie 有更大的容量。
- 数据持久，即使浏览器关闭后也能保留。

### 缺点
- 安全性较低，容易受到 XSS 攻击。
- 只能在同一个域名下使用，且不能跨域共享数据。

---

## 使用示例

```js
// 存储数据
localStorage.setItem("username", "John");

// 读取数据
var user = localStorage.getItem("username");

// 删除数据
localStorage.removeItem("username");
