const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Nouvelle demande');
});

server.listen(process.env.port || 3000);
