# 1. 子页面（iframe）
```js

<script>
  // 接收来自父窗口的消息
  window.addEventListener('message', function(event) {
    console.log('子页面接收到消息：', event.data);

    // 回复父窗口
    event.source.postMessage('子页面已收到：' + event.data, event.origin);
  });
</script>

# 2. 父页面（主站）

```js

<iframe id="myFrame" src="http://b.com/child.html" style="width:600px;height:400px;"></iframe>

<script>
  const iframe = document.getElementById('myFrame');

  // 给 iframe 发送跨域消息
  iframe.onload = () => {
    iframe.contentWindow.postMessage('你好，iframe 页面！', 'http://b.com');
  };

  // 接收子页面回复的消息
  window.addEventListener('message', function(event) {
    if (event.origin !== 'http://b.com') return;
    console.log('父页面收到回复：', event.data);
  });
</script>

#⚠️ 安全注意点
// ✅ 必须验证 event.origin
// if (event.origin !== 'http://b.com') return;

// ✅ 用途总结
//     能做什么	                            不能做什么
//     跨域通信（iframe、popup）	               ❌ 跨域直接访问对方的 JS 或 DOM
//     跨域数据交换（通过 postMessage）	           ❌ 跨域 AJAX 请求
//     授权页面通信（如 OAuth 登录页）	            ❌ 读取对方 cookie/localStorage

// ✅ 想间接获取跨域数据怎么做？
//     你可以通过中转：

//     A 页面嵌入 B 页面（iframe）；

//     B 页面内部使用自己的接口（非跨域）请求数据；

//     B 页面将数据通过 postMessage 发回 A 页面。