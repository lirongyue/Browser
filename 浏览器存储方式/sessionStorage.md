# sessionStorage 详解

## 特点
- **存储位置**  
  sessionStorage 也是存储在客户端的浏览器中，和 localStorage 一样是 HTML5 引入的 API。
- **数据传递**  
  与 localStorage 类似，sessionStorage 的数据不会自动随请求发送给服务器，需要通过 JavaScript 手动读取和提交。
- **持久性**  
  sessionStorage 是会话级别的存储，当浏览器或页面关闭时，数据就会丢失。不同于 localStorage 的持久性，它更适合存储临时数据。
- **大小限制**  
  容量与 localStorage 相同，每个域名通常有 5-10MB 的存储空间。
- **安全性**  
  和 localStorage 一样，容易受到 XSS 攻击，但由于数据生命周期较短，受到攻击的影响较小。

---

## 用途
- 临时保存数据：如表单中未提交的数据、页面跳转时需要的中间状态、一次性数据等。

---

## 优缺点

### 优点
- 数据会话级别存储，浏览器或标签页关闭后数据自动销毁。
- 容量较大，适合存储临时数据。

### 缺点
- 安全性低，容易受到 XSS 攻击。
- 只能用于同一个浏览器窗口或标签页，不能跨标签页共享。

---

## 使用示例

```js
// 存储数据
sessionStorage.setItem("token", "abc123");

// 读取数据
var token = sessionStorage.getItem("token");

// 删除数据
sessionStorage.removeItem("token");
