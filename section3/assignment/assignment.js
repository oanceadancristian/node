const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Assignment</title></head>');
    res.write(
      '<body><h1>Welcome to my assignment!</h1><form action="/create-user" method="post"><input type="text" name="username"><button type="submit">Create username</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Assignment</title></head>');
    res.write(
      '<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  }
});

server.listen(3000);
