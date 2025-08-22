// location /api/ {
//   proxy_pass http://target-server.com/;
//   proxy_set_header Host $host;
//   proxy_set_header X-Real-IP $remote_addr;
// }