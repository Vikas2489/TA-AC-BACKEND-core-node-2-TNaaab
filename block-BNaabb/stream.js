let { createServer } = require('http');

let server = createServer(handleRequest);

function handleRequest(req, res) {
    let store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        res.setHeader("content-type", "text/plain");
        res.write(store);
        res.end();
    });
}

server.listen(3456);