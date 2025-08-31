const http = require('http');
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'editor', 'dist');

const server = http.createServer((req, res) => {
  const filePath = path.join(dist, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
