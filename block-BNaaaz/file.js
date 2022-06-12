// - create a server in `file.js`
// - Use createReadStream method in file.js to 
// read a file(readme.txt) and 
// send data to response one chunk at a time.

let http = require("http");
let fs = require("fs");


let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    fs.createReadStream("./readme.txt").pipe(res);
}

server.listen(3412);