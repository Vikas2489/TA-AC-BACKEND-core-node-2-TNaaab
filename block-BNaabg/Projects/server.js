let http = require("http");
let fs = require("fs");
// let qs = require("querystring");
let url = require("url");
const userDir = __dirname + "/users/";

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        let parsedUrl = url.parse(req.url, true);
        // create user
        if (req.method === "POST" && req.url === "/users") {
            var username = JSON.parse(store).username;
            fs.open(userDir + username + ".json", 'wx', (err, fd) => {
                if (err) return console.log(err);
                // fd is a file discriptor (an integer) which will points to the newly created file
                fs.writeFile(fd, store, (err) => {
                    if (err) return console.log(err);
                    fs.close(fd, () => {
                        return res.end(`${username} created successfully.`)
                    })
                })

            })
        }
        // get user
        else if (parsedUrl.pathname === "/users" && req.method === "GET") {
            let searchForfileName = parsedUrl.query.username;
            return fs.createReadStream(__dirname + '/users/' + searchForfileName + '.json').pipe(res);
        }
        // delete user
        else if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
            let searchForfileName = parsedUrl.query.username;
            fs.unlink(__dirname + '/users/' + searchForfileName + '.json', (err) => {
                if (err) return console.log(err);
                return res.end(`${searchForfileName} deleted successfully`)
            })
        }
        // update user
        else if (parsedUrl.pathname === "/users" && req.method === "PUT") {
            let searchForfileName = parsedUrl.query.username;
            fs.open(userDir + searchForfileName + ".json", "r+", (err, fd) => {
                if (err) return console.log(err);
                fs.ftruncate(fd, (err) => {
                    if (err) return console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if (err) return console.log(err);
                        fs.close(fd, () => {
                            return res.end(`${searchForfileName} updated successfully.`)
                        })
                    })
                })
            })
        } else {
            res.writeHead(404, { "content-type": "text/plain" });
            res.end("Page Not found 404")
        }
    })
}

// - create a route to handle update operation
// - grab the username from querystring
// - open the file(`fs.open`) using username.json from users directory
// - use `r+` flag this time, r+ ensures that file already exists
// - remove the content of file using `fs.ftruncate`
// - add the updated content using `fs.writeFile`
// - close the file
// - send response to client saying `user updated`


server.listen(2345);